import {
  Compiler,
  NgModuleFactory,
  NgModuleFactoryLoader,
  Optional,
  SystemJsNgModuleLoader,
  SystemJsNgModuleLoaderConfig,
  Injectable
} from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from '@app/store';
import { ErrorActions } from '@app/store/actions';
import { environment } from '../../environments/environment';

/**
 * Intercepts module load errors
 * NOTE: Should used with Injectable decorator:
 * https://codecraft.tv/courses/angular/dependency-injection-and-providers/configuring/
 * */
@Injectable()
export class MyNgModuleLoader implements NgModuleFactoryLoader {

  systemJsNgModuleLoader: SystemJsNgModuleLoader;

  constructor(
    private store$: Store<RootStoreState.State>,
    private readonly compiler: Compiler,
    @Optional() config?: SystemJsNgModuleLoaderConfig,
  ) {
    this.systemJsNgModuleLoader = new SystemJsNgModuleLoader(compiler, config);
  }

  public load(path: string) {
    return new Promise<NgModuleFactory<any>>(((resolve) => {
      let causedError = false;
      const retry = (attempt = 0) => {
        this.systemJsNgModuleLoader.load(path).then((data) => {
          if (causedError) {
            this.store$.dispatch(new ErrorActions.GoOnline());
          }

          resolve(data);
        }, (error) => {
          if (attempt === 1 && !environment.production) {
            console.error(error);
          } else if (!causedError) {
            causedError = true;
            this.store$.dispatch(new ErrorActions.GoOffline());
          }

          const timeout = Math.pow(2, Math.min(attempt, 3)) * 1000;

          setTimeout(() => {
            retry(attempt + 1);
          }, timeout);
        });
      };

      retry();
    }));

  }
}

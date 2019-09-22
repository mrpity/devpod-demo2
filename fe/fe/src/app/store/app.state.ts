import { AvatarStoreState } from '../avatar/store';
import { ProxyStoreState } from '../proxy/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '@app/shared/utils';


export interface State {
  avatar: AvatarStoreState.State;
  proxy: ProxyStoreState.State;
  router: RouterReducerState<RouterStateUrl>;
}

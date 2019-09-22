import { Params, RouterStateSnapshot } from '@angular/router';
import {
  RouterStateSerializer,
} from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  path: string;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    let childParams = {};
    const pathArr: string[] = [''];
    while (route.firstChild) {
      const partialParams = Object.keys(route.params);
      if (partialParams.length) {
        childParams = { ...childParams, ...route.params };
      }
      const pushToPathArr = () => {
        if (route.routeConfig && route.routeConfig.path) {
          pathArr.push(route.routeConfig.path);
        }
      };
      pushToPathArr();
      route = route.firstChild;
      if (!route.firstChild) {
        pushToPathArr();
      }
    }

    const path: string = pathArr.join('/');

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = Object.keys(route.params).length ? route : { params: childParams };
    return { url, params, queryParams, path };
  }
}

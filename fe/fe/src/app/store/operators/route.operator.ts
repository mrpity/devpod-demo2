import { MonoTypeOperatorFunction, OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { RouterStateUrl } from '@app/shared/utils';

export function isRoute(route: string | string[] | RegExp) {
  return (action: RouterNavigationAction<RouterStateUrl>) => {
    const isRouteAction = action.type === ROUTER_NAVIGATION;
    if (isRouteAction) {
      const routeAction = action as RouterNavigationAction<RouterStateUrl>;
      const routePath = routeAction.payload.routerState.path;
      if (Array.isArray(route)) {
        return route.indexOf(routePath) > -1;
      } else if (route instanceof RegExp) {
        return route.test(routePath);
      } else {
        return routePath === route;
      }
    }
    return isRouteAction;
  };
}

export function ofRoute(route: string | string[] | RegExp): MonoTypeOperatorFunction<RouterNavigationAction<RouterStateUrl>> {
  return filter<RouterNavigationAction<RouterStateUrl>>(isRoute(route));
}

export function mapToParam<T>(key: string): OperatorFunction<RouterNavigationAction<RouterStateUrl>, T> {
  return map<RouterNavigationAction<RouterStateUrl>, T>(action => action.payload.routerState.params[key]);
}

export function mapToQueryParam<T>(key: string): OperatorFunction<RouterNavigationAction<RouterStateUrl>, T> {
  return map<RouterNavigationAction<RouterStateUrl>, T>(action => action.payload.routerState.queryParams[key]);
}


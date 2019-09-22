import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as AppStoreReducers from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RootStoreEffects } from '@app/store/app.effects';
import { AvatarStoreModule } from '../avatar/store';
import { ProxyStoreEffects } from '@app/proxy/store/proxy.effects';
import { ProxyStoreModule } from '@app/proxy/store';
import { DataSourceStoreModule } from '@app/data-source/store';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { CustomSerializer } from '@app/shared/utils';
import { SearchStoreModule } from '@app/search/store/search-store.module';
import { UserStoreModule } from '@app/user/store';
import { AnalyticStoreModule } from '@app/analytic/store/analytic-store.module';
import { NotificationStoreModule } from '@app/notification/store';

@NgModule({
  imports: [
    CommonModule,
    AvatarStoreModule,
    DataSourceStoreModule,
    SearchStoreModule,
    UserStoreModule,
    ProxyStoreModule,
    NotificationStoreModule,
    AnalyticStoreModule,
    StoreModule.forRoot(
      AppStoreReducers.reducersToken,
      { metaReducers: AppStoreReducers.metaReducers }
    ),
    EffectsModule.forRoot([RootStoreEffects, ProxyStoreEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 50
    }),
  ],
  providers: [AppStoreReducers.reducersProvider],
  declarations: []
})
export class AppStoreModule { }

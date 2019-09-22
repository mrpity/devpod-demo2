import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducersToken, reducersProvider } from './notification.reducers';
import { EffectsModule } from '@ngrx/effects';
import { NotificationStoreEffects } from './notification.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('notification', reducersToken),
    EffectsModule.forFeature([NotificationStoreEffects]),
  ],
  providers: [reducersProvider]
})
export class NotificationStoreModule {}

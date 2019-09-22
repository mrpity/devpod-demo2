import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducersToken, reducersProvider } from './user.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserStoreEffects } from './user.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('user', reducersToken),
    EffectsModule.forFeature([UserStoreEffects]),
  ],
  providers: [reducersProvider]
  // providers: [{ provide: reducersToken, useValue: reducers }]
})
export class UserStoreModule {}

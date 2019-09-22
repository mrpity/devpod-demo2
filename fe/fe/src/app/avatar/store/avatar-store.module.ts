import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducersToken, reducersProvider } from './avatar.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AvatarStoreEffects } from './avatar.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('avatar', reducersToken),
    EffectsModule.forFeature([AvatarStoreEffects]),
  ],
  providers: [reducersProvider]
})
export class AvatarStoreModule {}

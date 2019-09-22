import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './effects';
import { reducers, reducersToken } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('analytic', reducersToken),
    EffectsModule.forFeature(effects),
  ],
  providers: [{ provide: reducersToken, useValue: reducers }]
})
export class AnalyticStoreModule { }

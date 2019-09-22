import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducersToken, reducersProvider } from './proxy.reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('proxy', reducersToken)
  ],
  providers: [reducersProvider]
})
export class ProxyStoreModule {}

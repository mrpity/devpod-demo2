import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducersToken, reducersProvider } from './data-source.reducers';
import { EffectsModule } from '@ngrx/effects';
import { DataSourceStoreEffects } from './data-source.effects';
import { SearchService } from '@app/search/services/search.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('dataSource', reducersToken),
    EffectsModule.forFeature([DataSourceStoreEffects]),
  ],
  providers: [reducersProvider, SearchService]
})
export class DataSourceStoreModule {}

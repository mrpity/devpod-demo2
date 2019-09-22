import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DataSourceStoreActions, DataSourceStoreState } from '../../store/index';
import { DataSourceListQuery } from '@app/data-source/models/data-source.model';

@Component({
  selector: 'app-list-filters',
  templateUrl: './list-filters.component.html',
  styleUrls: ['./list-filters.component.scss']
})
export class ListFiltersComponent implements OnInit {

  @Input()
  listQueryFilter: DataSourceListQuery;

  types: string;
  searchQuery: string;

  constructor(
    public dialog: MatDialog,
    private store$: Store<DataSourceStoreState.State>
  ) { }


  ngOnInit() {
    this.searchQuery = this.listQueryFilter.searchQuery || '';
  }

  applySearch(value) {
    this.searchQuery = value;
    this.refreshList();
  }

  refreshList() {
    this.store$.dispatch(
      new DataSourceStoreActions.DataSourceListActions.ChangeFilter({ searchQuery: this.searchQuery, pageNumber: 0 })
    );
  }

}

import {Component, OnInit, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ProxyStoreState, ProxyStoreActions } from '../../store/index';
import {ProxyListQueryModel} from '../../models/proxy.interface';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input()
  listQueryFilter: ProxyListQueryModel;

  types: string;
  searchQuery: string;

  constructor(
    public dialog: MatDialog,
    private store$: Store<ProxyStoreState.State>
  ) {}


  ngOnInit() {
    this.searchQuery = this.listQueryFilter.searchQuery || '';
  }

  applySearch(value) {
    this.searchQuery = value;
    this.refreshList();
  }

  refreshList() {
    this.store$.dispatch(
      new ProxyStoreActions.ProxyListActions.ChangeFilter({ searchQuery: this.searchQuery, pageNumber: 0 })
    );
  }

}

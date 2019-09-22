import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AllFiltersModalComponent } from '@app/avatar/avatar-list/all-filters-modal/all-filters-modal.component';
import { Store } from '@ngrx/store';
import { AvatarFiltersModel } from '../../models/avatar.model';
import { AvatarStoreState, AvatarStoreActions } from '../../store';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges {

  @Input()
  listQueryFilter: AvatarFiltersModel;

  types: string;
  allFiltersDialogRef: MatDialogRef<AllFiltersModalComponent, any>;
  filter: Partial<AvatarFiltersModel>;

  /**
   * Constructor
   * @param dialog - material modal dialog window
   * @param store$ - current global rxjs object
   */
  constructor(
    public dialog: MatDialog,
    private store$: Store<AvatarStoreState.State>
  ) {}

  /**
   * Set filters on component init
   */
  ngOnInit() {
    this.filter = {
      ...this.listQueryFilter,
      searchInName: this.listQueryFilter.searchInName || ''
    };
  }

  /**
   * Update filters after updating props
   * @param changes - component props that changed
   */
  ngOnChanges(changes) {
    const newFilters = changes.listQueryFilter.currentValue;
    this.filter = {
      ...newFilters,
      searchInName: newFilters.searchInName || ''
    };
  }

  /**
   * Apply searchInName value and get list
   * @param val - search value of searchInName input
   */
  applySearch(val) {
    this.filter.searchInName = val;
    this.refreshList();
  }

  /**
   * Add new filter for avatar list and get list
   * @param type - type of filter [modified, created, types, all]
   */
  addFilters(type: string) {
    this.allFiltersDialogRef = this.dialog.open(AllFiltersModalComponent, {
      id: 'm_addFilters',
      width: '500px',
      data: {
        applyBtn: _('general.applyBtn'),
        deleteBtn: _('general.deleteBtn'),
        filter: this.filter,
        remove: this.remove,
        type: type
      }
    });
    this.allFiltersDialogRef.afterClosed().subscribe(result => {
      switch (result.type) {
        case 'update':
          this.filter = {
            ...this.filter,
            ...this.addMissingRangeDates(result.data)
          };
          this.refreshList();
          break;
        case 'remove':
          this.remove(result.data);
          break;
        case 'close':
        default:
          return false;
      }
    });
  }

  /**
   * Remove some filter and get list
   * @param name - filter to remove
   */
  remove(name) {
    if (name === 'types') {
      delete this.filter.types;
    } else if (name === 'snType') {
      delete this.filter.snType;
    } else if (name === 'created') {
      delete this.filter.createdAtTo;
      delete this.filter.createdAtFrom;
    } else if (name === 'modified') {
      delete this.filter.modifiedAtTo;
      delete this.filter.modifiedAtFrom;
    }
    this.refreshList();
  }
  /**
   * Check whether add filter btn available
   */
  isAddBtnAvailable() {
    return !(
      (this.filter.types && this.filter.types.length) > 0 &&
      (this.filter.snType && this.filter.snType.length > 0) &&
      (this.filter.createdAtTo || this.filter.createdAtFrom) &&
      (this.filter.modifiedAtTo || this.filter.modifiedAtFrom)
    );
  }

  /**
   * Check whether remove filters btn available
   */
  isRemoveBtnAvailable() {
    return (
      (this.filter.types && this.filter.types.length > 0) ||
      (this.filter.snType && this.filter.snType.length > 0) ||
      (this.filter.createdAtTo || this.filter.createdAtFrom) ||
      (this.filter.modifiedAtTo || this.filter.modifiedAtFrom)
    );
  }
  /**
   * Dispatch an action for get avatar list with selected filters
   */
  refreshList() {
    this.store$.dispatch(
      new AvatarStoreActions.AvatarListActions.ChangeFilter({ filter: this.filter, pageNumber: 0 })
    );
  }

  /**
   * Add start/end period dates for properly filtering
   * @param filter - filter data
   */
  addMissingRangeDates(filter) {
    if (!!filter.createdAtFrom && !filter.createdAtTo) {
      filter.createdAtTo = new Date();
    } else if (!filter.createdAtFrom && !!filter.createdAtTo) {
      filter.createdAtFrom = new Date('2018-01-01');
    }
    if (!!filter.modifiedAtFrom && !filter.modifiedAtTo) {
      filter.modifiedAtTo = new Date();
    } else if (!filter.modifiedAtFrom && !!filter.modifiedAtTo) {
      filter.modifiedAtFrom = new Date('2018-01-01');
    }
    return filter;
  }

  /**
   * Reset all filters
   */
  resetFilters() {
    this.filter = {};
    this.refreshList();
  }

  /**
   * Clear search input
   */
  removeSearch() {
    this.applySearch('');
  }
}

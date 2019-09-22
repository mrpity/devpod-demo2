import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as AvatarStoreSelectors from '@app/avatar/store/avatar.selectors';
import * as AvatarStoreState from '@app/avatar/store/avatar.state';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-export-diff-table',
  templateUrl: './export-diff-table.component.html',
  styleUrls: ['./export-diff-table.component.scss'],
  providers: [DatePipe]
})
export class ExportDiffTableComponent implements OnInit {

  @Input() exportData: any;
  @Input() selectedSN: string[];
  @Input() exportDisabled: boolean;
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();
  avatarDetails: any;
  // TODO add educations
  allFields = [
    'bio',
    'birthDate',
    'emails',
    'favoriteAppsAndGames',
    'favoriteBooks',
    'favoriteMovies',
    'favoriteMusic',
    'favoriteSports',
    'favoriteTvShows',
    'firstName',
    'fromLocation',
    'gender',
    'languages',
    'lastName',
    'livesInLocation',
    'maritalStatus',
    'middleName',
    // 'occupations', // DEPRECATED!
    'phones',
    'politicalViews',
    'profilePicBase64',
    'religiousViews',
    'socialLinks',
    'websites',
    'educations'
  ];
  checkedFields = [];
  availableFields = [];

  constructor(private store$: Store<AvatarStoreState.State>,
    public translate: TranslateService,
    public datePipe: DatePipe) { }

  ngOnInit() {
    this.store$.pipe(
      select(
        AvatarStoreSelectors.getSelectedDetails
      )
    ).subscribe(data => {
      this.avatarDetails = data;
      this.availableFields = this.getAvailableFields(data);
      this.checkedFields = [];
    });
  }

  getAvailableFields(avatarDetails) {
    const availableFields = [];
    this.allFields.forEach((fieldName) => {
      if (Array.isArray(avatarDetails[fieldName]) && avatarDetails[fieldName].length) {
        availableFields.push(fieldName);
      } else if (avatarDetails[fieldName] !== null && avatarDetails[fieldName] !== undefined && avatarDetails[fieldName] !== '') {
        availableFields.push(fieldName);
      }
    });
    return availableFields;
  }

  isExportDisabled() {
    return this.checkedFields.length === 0 || this.exportDisabled;
  }

  exportConfirm() {
    this.confirm.emit(this.checkedFields);
  }

  exportCancel() {
    this.cancel.emit();
  }

  isPropertyExistInSN(snName) {
    return this.selectedSN.indexOf(snName.toUpperCase()) !== -1;
  }

  toggleField(name) {
    const index = this.checkedFields.indexOf(name);
    if (index === -1) {
      this.checkedFields.push(name);
    } else {
      this.checkedFields.splice(index, 1);
    }
  }

  isChecked(name) {
    return this.checkedFields.indexOf(name) !== -1;
  }
  isAllChecked() {
    return this.checkedFields.length === this.availableFields.length;
  }

  isIndeterminate() {
    return (this.checkedFields.length !== 0
      && this.checkedFields.length !== this.availableFields.length);
  }

  toggleAll() {
    if (this.isAllChecked()) {
      this.checkedFields = [];
    } else {
      this.checkedFields = [...this.availableFields];
    }
  }

  convertEducations(educations) {
    const value = [];
    educations.forEach((item) => {
      value.push(item.name);
    });
    return value;
  }
}

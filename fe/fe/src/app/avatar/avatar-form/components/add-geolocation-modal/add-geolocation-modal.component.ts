import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { AvatarStoreActions, AvatarStoreSelectors, AvatarStoreState } from '../../../store';
import { AvatarCity } from '../../../models/avatar.model';

@Component({
  selector: 'app-add-geolocation-modal',
  templateUrl: './add-geolocation-modal.component.html',
  styleUrls: ['./add-geolocation-modal.component.scss']
})
export class AddGeolocationModalComponent implements OnInit {
  heading: string;
  geolocation: AvatarCity;
  geoCtrl: FormControl = new FormControl();
  geolocationList: AvatarCity[];
  submitted = false;
  valueChangeDelay = 500;
  valueChanged = false;
  nothingFound = false;

  // https://angular.io/guide/static-query-migration#why-do-i-have-to-specify-static-false-isnt-that-the-default
  @ViewChild('auto', { static: false }) matAutocomplete;

  private _onDestroy = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddGeolocationModalComponent>,
    private store$: Store<AvatarStoreState.State>
  ) {}

  ngOnInit() {
    this.heading = this.data.heading;

    if (this.data.geolocation) {
      this.geoCtrl.setValue(this.data.geolocation);
    }

    this.geoCtrl.valueChanges
      .pipe(
        takeUntil(this._onDestroy)
      )
      .pipe(
        debounceTime(this.valueChangeDelay)
      )
      .subscribe(() => {
        const search = this.geoCtrl.value;
        if (search.length >= 3) {
          this.valueChanged = true;
          this.getGeolocationCities(search);
        }
      });

    this.store$.pipe(
      select(
        AvatarStoreSelectors.getCities
      )
    ).subscribe((data) => {
      if (data.length) {
        this.geolocationList = data;
        // this.nothingFound = false;
      } else {
        this.geolocationList = [];
        // this.nothingFound = true;
      }
      this.valueChanged = false;
    });
  }

  getGeolocationCities(search) {
    this.store$.dispatch(
      new AvatarStoreActions.AvatarAdditionalActions.SearchCitiesRequest(search)
    );
  }

  displayGeolocation(geo?: AvatarCity): string | undefined {
    return geo && geo.city ? `${geo.city}, ${geo.country}` : undefined;
  }

  closeDialog() {
    this.submitted = true;
    if (this.geoCtrl.value.city) {
      this.dialogRef.close(this.geoCtrl.value);
      this.store$.dispatch(
        new AvatarStoreActions.AvatarAdditionalActions.ClearCities()
      );
    }
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '@app/shared/services/helpers.service';

@Component({
  selector: 'app-all-filters-modal',
  templateUrl: './all-filters-modal.component.html',
  styleUrls: ['./all-filters-modal.component.scss']
})
export class AllFiltersModalComponent implements OnInit {

  filtersForm: FormGroup;

  types = [{
    name: 'avatar.baby',
    value: 'BABY',
    isChecked: false
  }, {
    name: 'avatar.active',
    value: 'ACTIVE',
    isChecked: false
  }, {
    name: 'avatar.data_miner',
    value: 'DATA_MINER',
    isChecked: false
  }];

  filter: any;

  snType = [{
    name: 'avatar.links.FACEBOOK',
    value: 'FACEBOOK',
    isChecked: false
  }, {
    name: 'avatar.links.ODNOKLASSNIKI',
    value: 'ODNOKLASSNIKI',
    isChecked: false
  }];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AllFiltersModalComponent>,
    private formBuilder: FormBuilder,
    private helpersService: HelpersService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    if (this.data) {
      this.filter  = this.data.filter;
    }
    if (this.filter && this.filter.types) {
      this.types.forEach((type) => {
        if (this.filter.types.indexOf(type.value) !== -1) {
          type.isChecked = true;
        }
      });
    }
    if (this.filter && this.filter.snType) {
      this.snType.forEach((sn) => {
        if (this.filter.snType.indexOf(sn.value) !== -1) {
          sn.isChecked = true;
        }
      });
    }
    this.filtersForm = this.formBuilder.group({
      createdRangeForm: this.formBuilder.group({
        startDate: [this.filter.createdAtFrom, {validators: []}],
        endDate: [this.filter.createdAtTo, {validators: []}],
      }, {validator: this.checkDates}),
      modifiedRangeForm: this.formBuilder.group({
        startDate: [this.filter.modifiedAtFrom , {validators: []}],
        endDate: [this.filter.modifiedAtTo , {validators: []}]
      }, {validator: this.checkDates}),
    });
  }

  checkDates(group: FormGroup) {
    if (group.controls.endDate.value && group.controls.startDate.value && (group.controls.endDate.value < group.controls.startDate.value)) {
      return { notValid: true };
    }
    return null;
  }
  getCreatedRange() {
    const createdRangeForm = this.filtersForm.get('createdRangeForm');
    return {
      createdAtFrom: createdRangeForm.get('startDate').value,
      createdAtTo: createdRangeForm.get('endDate').value,
    };
  }
  getModifiedRange() {
    const modifiedRangeForm = this.filtersForm.get('modifiedRangeForm');
    return {
      modifiedAtFrom: modifiedRangeForm.get('startDate').value,
      modifiedAtTo: modifiedRangeForm.get('endDate').value,
    };
  }

  apply() {
    if (this.filtersForm.invalid) {
      return;
    }
    let newFilters;
    const pickedTypes = [];
    const pickedSocials = [];
    this.types.forEach((type) => {
      if (type.isChecked) {
        pickedTypes.push(type.value);
      }
    });
    this.snType.forEach((sn) => {
      if (sn.isChecked) {
        pickedSocials.push(sn.value);
      }
    });
    if (this.data.type === 'all') {
      newFilters = {
        ...{ types: pickedTypes },
        ...{ snType: pickedSocials },
        ...this.helpersService.removeEmptyKeys({...this.getCreatedRange(), ...this.getModifiedRange()})
      };
    } else if (this.data.type === 'created') {
      newFilters = this.getCreatedRange();
    } else if (this.data.type === 'modified') {
      newFilters = this.getModifiedRange();
    } else if (this.data.type === 'types') {
      newFilters = { types: pickedTypes };
    } else if (this.data.type === 'snType') {
      newFilters = { snType: pickedSocials };
    }

    this.dialogRef.close({
      type: 'update',
      data: newFilters
    });
  }

  close() {
    this.dialogRef.close({
      type: 'close',
      data: false
    });
  }

  remove(name) {
    this.dialogRef.close({
      type: 'remove',
      data: name
    });
  }

}

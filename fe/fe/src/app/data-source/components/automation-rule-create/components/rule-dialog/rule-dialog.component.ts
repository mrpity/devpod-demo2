import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelpersService } from '@app/shared/services/helpers.service';
import * as moment from 'moment/moment';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

_('dataSource.addDataSource.createAutomationRule.when.daysOfWeek.monday');
_('dataSource.addDataSource.createAutomationRule.when.daysOfWeek.tuesday');
_('dataSource.addDataSource.createAutomationRule.when.daysOfWeek.wednesday');
_('dataSource.addDataSource.createAutomationRule.when.daysOfWeek.thursday');
_('dataSource.addDataSource.createAutomationRule.when.daysOfWeek.friday');
_('dataSource.addDataSource.createAutomationRule.when.daysOfWeek.saturday');
_('dataSource.addDataSource.createAutomationRule.when.daysOfWeek.sunday');

@Component({
  selector: 'app-rule-dialog',
  templateUrl: './rule-dialog.component.html',
  styleUrls: ['./rule-dialog.component.scss']
})
export class RuleDialogComponent implements OnInit {

  addRuleForm: FormGroup = null;
  repeatingType = 'once';
  expirationReason = 'date';
  radioChangeEventStream = new Subject();
  timezones = this.helpers.getTimeZones();
  currentTimezone = this.helpers.getCurrentOffsetValue();
  submitted = false;
  toTimeNextDayHint = false;
  frequencyList = ['once', 'daily', 'weekly', 'monthly'];
  daysOfWeek: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  daysOfMonth = this.helpers.generateListNumber(1, 31);
  minDate = new Date();
  connectionsPattern = new RegExp(/^0*(?:[1-9][0-9]?|100)$/);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RuleDialogComponent>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private helpers: HelpersService) { }

  ngOnInit() {
    this.toggleChange(this.repeatingType);
    this.radioChangeSubscription();
  }

  toggleChange(value) {
    this.toTimeNextDayHint = false;
    this.submitted = false;
    this.repeatingType = value;
    this.createForm();
    this.expirationReason = 'date';
  }

  radioChangeSubscription() {
    this.radioChangeEventStream.pipe(
      debounceTime(200)
    ).subscribe((event: any) => {
      if (event.value === 'date') {
        this.addRuleForm.get('maxConnections').disable();
        this.addRuleForm.get('expirationDate').enable();
      } else if (event.value === 'requests') {
        this.addRuleForm.get('expirationDate').disable();
        this.addRuleForm.get('maxConnections').enable();
      }
      this.expirationReason = event.value;
    });
  }

  private createForm() {
    this.addRuleForm = this.formBuilder.group({});

    this.addCommonFormControls();
    this.setCommonValues();
    switch (this.repeatingType) {
      case 'once':
        this.addRuleForm.controls.onceDate.enable();
        return;
      case 'weekly':
        this.addRuleForm.controls.daysOfWeek.enable();
        break;
      case 'monthly':
        this.addRuleForm.controls.dayOfMonth.enable();
        break;
    }
    this.addRuleForm.controls.expirationDate.enable();
  }

  get f(): any {
    return this.addRuleForm.controls;
  }

  private updateTimeFrom() {
    return moment().format('HH:mm');
  }

  private updateTimeTo() {
    return moment().add(1, 'hours').format('HH:mm');
  }

  private updateDate() {
    return moment().format('YYYY-MM-DD');
  }

  private addCommonFormControls() {
    this.addRuleForm.addControl('frequency', new FormControl('', Validators.required));
    this.addRuleForm.addControl('zoneOffset', new FormControl('', Validators.required));
    this.addRuleForm.addControl('activeTimeFrom', new FormControl('', { validators: [Validators.required, this.isTimeValid] }));
    this.addRuleForm.addControl('activeTimeTo', new FormControl('', { validators: [Validators.required, this.isTimeValid] }));
    this.addRuleForm.addControl('onceDate', new FormControl({ value: '', disabled: true }, Validators.required));
    this.addRuleForm.addControl('expirationDate',
      new FormControl({ value: '', disabled: true }, Validators.required));
    this.addRuleForm.addControl('maxConnections',
      new FormControl({ value: '', disabled: true },
        { validators: [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern(this.connectionsPattern)] }));
    this.addRuleForm.addControl('daysOfWeek', new FormControl({ value: '', disabled: true }, Validators.required));
    this.addRuleForm.addControl('dayOfMonth', new FormControl({ value: '', disabled: true }, Validators.required));
    this.listenCommonChanges();
  }

  private listenCommonChanges() {
    this.addRuleForm.get('activeTimeFrom').valueChanges.pipe(
      debounceTime(200),
      filter(Boolean),
    ).subscribe((value) => {
      const activeTimeToValue = this.addRuleForm.get('activeTimeTo').value;
      this.updateTimeErrors(value, activeTimeToValue);
    });

    this.addRuleForm.get('activeTimeTo').valueChanges.pipe(
      debounceTime(200),
      filter(Boolean),
    ).subscribe((value) => {
      const activeTimeFromValue = this.addRuleForm.get('activeTimeFrom').value;
      this.updateTimeErrors(activeTimeFromValue, value);
    });

    this.addRuleForm.get('maxConnections').valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      filter(Boolean),
      filter(value => value > 100 || value < 1)
    ).subscribe((value) => {
      if (value < 0) {
        this.addRuleForm.get('maxConnections').setValue(1);
      }
      this.addRuleForm.updateValueAndValidity();
    });
  }

  private setCommonValues() {
    this.addRuleForm.patchValue({
      frequency: this.repeatingType.toUpperCase(),
      activeTimeFrom: this.updateTimeFrom(),
      activeTimeTo: this.updateTimeTo(),
      zoneOffset: this.currentTimezone,
      onceDate: this.updateDate(),
      expirationDate: this.updateDate(),
      maxConnections: null,
      daysOfWeek: '',
      dayOfMonth: ''
    });
  }

  private updateTimeErrors(activeTimeFrom, activeTimeTo) {
    this.toTimeNextDayHint = false;
    const from = moment(activeTimeFrom, 'HH:mm');
    let to = moment(activeTimeTo, 'HH:mm');
    if (activeTimeFrom > activeTimeTo) {
      to = to.add(1, 'days');
      this.toTimeNextDayHint = true;
    }
    const fromToDiff = to.diff(from, 'minutes');
    if (fromToDiff < 60) {
      this.addRuleForm.get('activeTimeTo').setErrors({ 'lessThanHourPeriod': true });
      this.addRuleForm.get('activeTimeTo').markAsTouched();
    }
    this.addRuleForm.updateValueAndValidity();
  }

  private isTimeValid(control: FormControl) {
    try {
      if (control.value) {
        const activeTime = moment(control.value, 'HH:mm');
        if (activeTime.isValid()) {
          return null;
        } else {
          return { 'invalidActiveTime': true };
        }
      }
    } catch (e) {
      return e.message;
    }
  }

  submit() {
    this.submitted = true;
    this.helpers.validateAllFormFields(this.addRuleForm);
    if (this.addRuleForm.invalid) {
      return;
    }
    this.dialogRef.close(this.addRuleForm.value);
  }
}



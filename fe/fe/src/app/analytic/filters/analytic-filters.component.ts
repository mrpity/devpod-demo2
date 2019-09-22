import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ResourceTypesEnum } from '@app/analytic/models/analytic-request.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { HelpersService } from '@app/shared/services/helpers.service';
import { ScaleEnum } from '@app/analytic/models/analytic-result.model';
import { FiltersState } from '@app/analytic/store/reducers/analytic-filters.reducer';
import * as moment from 'moment';

_('analytic.filters.scale.days');
_('analytic.filters.scale.weeks');
_('analytic.filters.scale.months');
_('analytic.filters.scale.years');

@Component({
  selector: 'app-analytic-filters',
  templateUrl: './analytic-filters.component.html',
  styleUrls: ['./analytic-filters.component.scss']
})
export class AnalyticFiltersComponent implements OnInit {

  form: FormGroup;
  resourceTypes = Object.keys(ResourceTypesEnum);
  scaleRange = Object.keys(ScaleEnum);
  scales: string[];
  _filtersData: FiltersState;
  isFiltersDisabled: boolean;
  currentDate = moment();

  @Input()
  set filtersData(data) {
    if (data) {
      this._filtersData = data;
      if (this.form) {
        this.isFiltersDisabled = data.isResultsFiltersDisabled;
        this.isFiltersDisabled ? this.form.disable() : this.form.enable();
        const {query, scale, zoneOffset} = data;
        this.scales = [scale];
        const fromDate = moment(data.fromDate).utcOffset(zoneOffset);
        const toDate = moment(data.toDate).utcOffset(zoneOffset);
        this.form.patchValue({
          query,
          scale,
          datePeriod: {fromDate, toDate}
        });
      }
    }
  }

  get filtersData() {
    return this._filtersData;
  }

  @Output()
  saveSearch = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
              public helpers: HelpersService) {
  }

  ngOnInit() {
    this.createForm();
    this.subscribeToFormChanges();
  }

  get f() {
    return this.form.controls;
  }

  createForm() {
    this.form = this.formBuilder.group({
      query: [this.filtersData.query, Validators.minLength(3)],
      datePeriod: this.formBuilder.group({
        fromDate: [this.filtersData.fromDate, {validators: []}],
        toDate: [this.filtersData.toDate, {validators: []}],
      }, {validators: [this.checkDates, this.checkCurrent]}),
      scale: [this.filtersData.scale],
    });
    if (this.filtersData.isResultsFiltersDisabled) {
      this.form.disable();
    }
  }

  /** Validate from date less than to date */
  checkDates(group: FormGroup) {
    if (group.controls.toDate.value && group.controls.fromDate.value && (group.controls.toDate.value < group.controls.fromDate.value)) {
      return { notValid: true };
    }
    return null;
  }


  /** Validate future dates */
  checkCurrent(group: FormGroup) {
    const currentDate = moment();
    if (group.controls.toDate.value && group.controls.fromDate.value
      && (group.controls.toDate.value > currentDate
        || group.controls.fromDate.value > currentDate)) {
      return { futureFromTo: true };
    }
    return null;
  }

  /**
   * Modify scale range based on from/to period
   */
  subscribeToFormChanges() {
    const datePeriod = this.f['datePeriod'];
    datePeriod.valueChanges.pipe(
      distinctUntilChanged(),
      filter(() => this.form.get('datePeriod').valid)
    ).subscribe(values => {
      const {fromDate: from, toDate: to} = values;
      const diff = to.diff(from, 'days');
      this.checkDiff(diff);
      this.checkScale();
    });
  }

  /** Modify select range for scale form field
   * @param diff - difference between from/to period in days
   * */
  checkDiff(diff: number) {
    if (diff < 7) {
      this.scales = this.scaleRange.filter(scale =>
        scale === ScaleEnum.DAYS
      );
    } else if (diff < 31) {
      this.scales = this.scaleRange.filter(scale =>
        scale === ScaleEnum.DAYS
        || scale === ScaleEnum.WEEKS
      );
    } else if (diff < 366) {
      this.scales = this.scaleRange.filter(scale =>
        scale === ScaleEnum.DAYS
        || scale === ScaleEnum.WEEKS
        || scale === ScaleEnum.MONTHS
      );
    } else {
      this.scales = this.scaleRange;
    }
  }

  /** Reset scale form value if it not in scales array */
  checkScale() {
    const scaleValue = this.f['scale'].value;
    if (scaleValue && !this.scales.includes(scaleValue)) {
      this.f['scale'].reset();
    }
  }

  /** Create analytics request */
  create() {
    if (!this.form.invalid && this.form.value) {
      const datePeriod = this.f['datePeriod'].value;
      datePeriod.fromDate = datePeriod.fromDate.format('YYYY-MM-DD');
      datePeriod.toDate = datePeriod.toDate.format('YYYY-MM-DD');
      this.saveSearch.emit({...this.form.value, ...datePeriod});
    }
  }

  isCreateDisabled(): boolean {
    const isQueryLength = this.f['query'].value ? (this.f['query'].value).trim().length < 3 : false;
    return this.isFiltersDisabled || isQueryLength || this.form.invalid;
  }
}

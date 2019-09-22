import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  ResourceTypesEnum } from '@app/search/models/request.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { FilterByService } from '@app/search/services/filter-by.service';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { HelpersService } from '@app/shared/services/helpers.service';
import { ResultTypesEnum } from '@app/search/models/result.model';
import { FiltersState } from '@app/search/store/reducers/filters.reducer';

_('search.filters.resource.fb');
_('search.filters.resource.ok');
_('search.filters.resource.web');
_('search.filters.result.profile');
_('search.filters.result.post');
_('search.filters.result.group');

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges {

  form: FormGroup;
  filter: any;
  resourceTypes = Object.keys(ResourceTypesEnum);
  resultTypes = Object.keys(ResultTypesEnum);

  @Input()
  filtersData: FiltersState;

  @Input()
  buttonsData: any;

  @Output()
  saveSearch = new EventEmitter<any>();

  @Output()
  getNew = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  // https://angular.io/guide/static-query-migration#why-do-i-have-to-specify-static-false-isnt-that-the-default
  @ViewChild('#getNewBtn', { static: false }) getNewBtn: ViewContainerRef;

  constructor(private formBuilder: FormBuilder,
              public filterBy: FilterByService,
              public helpers: HelpersService) {
  }

  ngOnInit() {
    this.filter = {
      ...this.filtersData
    };
    this.createForm();
    this.subscribeToFormChanges();
  }

  ngOnChanges(changes) {
    if (changes.filtersData && this.form) {
      const isDisabled = changes.filtersData.currentValue.isResultsFiltersDisabled;
      isDisabled ? this.form.disable() : this.form.enable();
      this.filter = {
        ...changes.filtersData.currentValue
      };
    }
  }

  get f() {
    return this.form.controls;
  }

  createForm() {
    this.form = this.formBuilder.group({
      query: [this.filter.query, Validators.minLength(3)],
      resourceTypes: [this.filter.resourceTypes],
      resultTypes: [this.filter.resultTypes],
      fromDate: [this.filter.fromDate],
      toDate: [this.filter.toDate],
    });
    if (this.filtersData.isResultsFiltersDisabled) {
      this.form.disable();
    }
  }

  subscribeToFormChanges() {
    this.form.valueChanges.pipe(
      distinctUntilChanged(),
      filter(() => !this.filtersData.isResultsFiltersDisabled)
    ).subscribe(values => {
      this.filter = {...values};
    });

    this.form.get('resourceTypes').valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      filter(() => !this.filtersData.isResultsFiltersDisabled)
    ).subscribe((result) => {
      if (!this.filterBy.byResourceType(result)) {
        this.form.get('resultTypes').reset();
        this.form.get('toDate').reset();
        this.form.get('fromDate').reset();
      }
    });
  }

  save() {
    const formValue = {
      toDate: null,
      fromDate: null
    };
    if (this.form.value.toDate && this.form.value.fromDate) {
      formValue.toDate = this.form.value.toDate.format('YYYY-MM-DD');
      formValue.fromDate = this.form.value.fromDate.format('YYYY-MM-DD');
    }
    this.saveSearch.emit({ ...this.form.value, ...formValue});
  }

  isFiltersEnabled() {
    const isQuerySelected = !!this.filter.query;
    const isQueryLength = this.filter.query ?  (this.filter.query).trim().length > 2 : false;
    const isWebSelected =  this.filter.resourceTypes ? this.filter.resourceTypes.includes(ResourceTypesEnum.WEB) : false;
    const isResultTypeSelected = this.filter.resultTypes ? this.filterBy.byResultType(this.filter.resultTypes) : false;
    const isResourceTypeSelected = this.filter.resourceTypes ? this.filterBy.byResourceType(this.filter.resourceTypes) : false;
    const isResourceResultSelected = isResourceTypeSelected && isResultTypeSelected;
    const isWebAndResourceResultSelected = isWebSelected && isResourceResultSelected;
    const isWebOrResourceResultSelected = isWebAndResourceResultSelected || isResourceResultSelected;
    const isWebNotResourceResultSelected = isWebSelected && !isResourceTypeSelected;
    const isFiltersSelected = isWebOrResourceResultSelected || isWebAndResourceResultSelected || isWebNotResourceResultSelected;
    const isQueryFiltersSelected = isQuerySelected && isFiltersSelected;
    return isQueryFiltersSelected && !this.filtersData.isResultsFiltersDisabled && isQueryLength;
  }
}

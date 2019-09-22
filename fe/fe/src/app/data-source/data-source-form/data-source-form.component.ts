import {
  Component,
  Output,
  EventEmitter,
  Input,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment/moment';
import { HelpersService } from '../../shared/services/helpers.service';
import { BehaviorSubject } from 'rxjs';
import { AutomationRuleDaily, AutomationRuleOnce } from '../models/automation-rule.model';
import { CrawlingTypesService } from '../services/crawling-types.service';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { FormMode, DataSourceType } from '../data-source.enums';

@Component({
  selector: 'app-data-source-form',
  templateUrl: './data-source-form.component.html',
  styleUrls: ['./data-source-form.component.scss']
})
export class DataSourceFormComponent implements AfterViewInit {
  /**
   * Public variables
   */
  nowDate = moment();
  activeTimeFrom = this.nowDate.format('HH:mm');
  activeTimeTo = this.nowDate.add(1, 'hours').format('HH:mm');
  expirationDate = this.nowDate.add(1, 'years').format('YYYY-MM-DD');
  zoneOffset = this.helpers.getCurrentOffsetValue();
  frequency = 'DAILY';
  depths = [1, 2];
  types = Object.keys(DataSourceType);
  proxyCountryList = [];
  proxyCityList = [];
  currentType = DataSourceType.WEB_GENERAL;
  submitted = false;
  automationRulesStream = new BehaviorSubject<(AutomationRuleDaily | AutomationRuleOnce)[]>([]);

  /**
   * Private variables
   */
  private _currentProxy: any;

  @Input() isLoading = false;
  @Input() isFailed = false;
  @Input() formMode = FormMode.ADD;

  /**
   * Getter/setter Proxy Dropdown
   */
  private _proxies: any[];
  @Input() set proxies(values: any[]) {
    this._proxies = values;
    this.proxyCountryList = values;
  }

  /**
   * Getter/setter Form Object
   */
  private _formObject: FormGroup;
  @Input() set formObject(value: FormGroup) {
    this._formObject = value;
    this.currentType = this._formObject.get('type').value;
    this.externalModifications.observers.length > 0
      ? this.externalModifications.emit()
      : this.makeFormModifications();
  }
  get formObject(): FormGroup {
    return this._formObject;
  }

  /**
   * Getter/setter Data Source details
   */
  private _dataSource: any;
  @Input() set dataSource(value: any) {
    this._dataSource = value;
    if (value && value.id) {
      this.automationRulesStream.next(value.automationRules);
    }
  }
  get dataSource(): any {
    return this._dataSource;
  }

  @Output() submitForm = new EventEmitter();
  @Output() submitFailed = new EventEmitter();
  @Output() setIsDirty = new EventEmitter();
  @Output() externalModifications = new EventEmitter();

  constructor(
    public helpers: HelpersService,
    public crawling: CrawlingTypesService,
    private cdRef: ChangeDetectorRef,
  ) { }

  get f() {
    return this._formObject.controls;
  }

  get webGeneral() {
    return this.currentType === DataSourceType.WEB_GENERAL;
  }

  ngAfterViewInit() {
    this.setCurrentProxyCountryCity();
    this.cdRef.detectChanges(); // ExpressionChangedAfterItHasBeenCheckedError resolve
  }

  setCurrentProxyCountryCity(): void {
    // Do nothing if no countries or if create/import mode
    if (this.formMode !== FormMode.EDIT || !this.proxyCountryList) {
      return;
    }

    // Set current proxy by country list
    this._currentProxy = this.proxyCountryList.find(item => item.countryCode === this._dataSource.proxyCountryCode);
    if (!this._currentProxy) {
      this.proxyCountryList.push({
        country: this._dataSource.proxyCountryCode,
        countryCode: this._dataSource.proxyCountryCode,
        cities: []
      });
    }

    // Set proxyCityList by default
    this.proxyCityList = this._currentProxy ? this._currentProxy.cities : [];
  }

  setProxyCityList($event) {
    const country = this.proxyCountryList.find(item => item.countryCode === $event.value);
    this._formObject.controls.proxyCity.patchValue(null);

    if (country && country.cities.length) {
      this.proxyCityList = country.cities;
      this._formObject.controls.proxyCity.enable();
    } else {
      this.proxyCityList = [];
      this._formObject.controls.proxyCity.disable();
    }
  }

  removeRule(rule) {
    for (let i = 0; i < this.f.automationRules.value.length; i++) {
      if (this.f.automationRules.value[i] === rule) {
        const newValue = this.f.automationRules.value.filter(item => item !== rule);
        this.updateRules(newValue);
      }
    }
  }

  addRule(rule) {
    const newValue = [...this.f.automationRules.value, rule];
    this.updateRules(newValue);
  }

  updateRules(newValue) {
    this.f.automationRules.setValue(newValue);
    this._formObject.markAsDirty();
    this._formObject.markAsTouched();
    this.automationRulesStream.next(this.f.automationRules.value);
  }

  updateDataSources(dataList: string[]) {
    if (dataList) {
      return this._formObject.get('resources').setValue(dataList);
    }
    this._formObject.get('resources').setErrors({ required: true });
  }

  submit() {
    this.submitted = true;
    this.helpers.validateAllFormFields(this._formObject);
    if (this._formObject.invalid) {
      return;
    }
    const data = this.helpers.cleanEmptyKeys(this._formObject.value);
    this.submitForm.emit(data);
  }

  private makeFormModifications() {
    if (this.currentType !== DataSourceType.WEB_GENERAL) {
      this._formObject.get('proxyCountryCode').disable();
      this._formObject.get('proxyCity').disable();
    }
    if (this.crawling.byUrl(this.currentType)) {
      this._formObject.get('profileId').disable();
    } else if (this.crawling.byProfile(this.currentType)) {
      this._formObject.get('url').disable();
    }
  }
}

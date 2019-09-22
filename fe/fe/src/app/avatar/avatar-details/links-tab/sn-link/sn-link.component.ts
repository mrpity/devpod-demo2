import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { ValidationService } from '@app/core/services/validation.service';
import { AvatarProxy, Avatar } from '@app/avatar/models/avatar.model';

_('avatar.validation.links.facebook.successfulLink');
_('avatar.validation.links.facebook.failLink');
_('avatar.validation.links.facebook.unlink');
_('avatar.validation.links.facebook.invalidCredentials');
_('avatar.validation.links.odnoklassniki.successfulLink');
_('avatar.validation.links.odnoklassniki.failLink');
_('avatar.validation.links.odnoklassniki.unlink');
_('avatar.validation.links.google.successfulLink');
_('avatar.validation.links.google.failLink');
_('avatar.validation.links.google.unlink');
_('avatar.validation.links.messageType.CREDENTIALS');
_('avatar.validation.links.messageType.API');
_('avatar.validation.links.messageType.AUTH');
_('avatar.validation.links.messageType.IO');
_('avatar.validation.links.messageType.PROXY');
_('avatar.validation.links.messageType.UNKNOWN');
_('avatar.validation.links.messageType.ACCOUNT_IN_USE');

@Component({
  selector: 'app-sn-link',
  templateUrl: './sn-link.component.html',
  styleUrls: ['./sn-link.component.scss']
})
export class SnLinkComponent implements OnInit, OnChanges {
  credentialsForm: FormGroup;
  submitted = false;
  viewMode = false;
  userProfile = {
    lastName: '',
    firstName: '',
    middleName: '',
    profilePicBase64: '',
    login: '',
    password: '',
    phone: '',
    proxyCountryCode: null,
    proxyCity: null,
    isLoading: false
  };
  proxyCityList: string[] = [];
  proxyCountryList: AvatarProxy[] = [];
  currentProxy: AvatarProxy;
  snName: string;

  @Input() connection: any;
  @Input() proxies: AvatarProxy[];
  @Input() avatarId: number;
  @Input() socialNetwork: string;
  @Output() updateConnection = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private _clipboardService: ClipboardService,
    private validationService: ValidationService
  ) { }

  get f() {
    return this.credentialsForm.controls;
  }

  ngOnInit() {
    if (this.connection) {
      this.viewMode = this.connection.enabled;
      this.userProfile = this.connection;
    }
    this.createForm();
    this.snName = this.socialNetwork.toLowerCase();
  }

  ngOnChanges(changes) {
    if (changes.connection && changes.connection.currentValue) {
      this.viewMode = changes.connection.currentValue.enabled;
      this.userProfile = changes.connection.currentValue;
      this.createForm();
    }
    if (changes.proxies && changes.proxies.currentValue) {
      this.proxyCountryList = [
        ...changes.proxies.currentValue,
      ];
      this.currentProxy = this.proxyCountryList.find(item => item.countryCode === this.userProfile.proxyCountryCode);
      if (!this.currentProxy) {
        this.proxyCountryList.push({
          country: this.userProfile.proxyCountryCode,
          countryCode: this.userProfile.proxyCountryCode,
          cities: []
        });
      }
      // const country = this.proxyCountryList.filter(item => item.country === currentProxy);
      this.proxyCityList = this.currentProxy ? this.currentProxy.cities : [];
    }
    if (this.credentialsForm && this.userProfile.proxyCountryCode && this.proxyCityList) {
      this.credentialsForm.controls.proxyCity.enable();
    }
  }

  createForm() {
    this.credentialsForm = this.formBuilder.group({
      login: [this.userProfile.login, { validators: [Validators.required] }],
      password: [this.userProfile.password, { validators: [Validators.required] }],
      phone: [this.userProfile.phone, {
        validators: [
          Validators.minLength(11),
          Validators.maxLength(13),
          Validators.pattern(this.validationService.loginPhoneRegEx)
        ]
      }
      ],
      proxyCountryCode: [this.userProfile.proxyCountryCode],
      proxyCity: [{ value: this.userProfile.proxyCity, disabled: !this.proxyCityList.length }]
    });
  }

  link() {
    this.submitted = true;
    if (this.credentialsForm.invalid) {
      return;
    }
    this.userProfile.isLoading = true;
    const connectionDetails = {
      enabled: true,
      type: this.socialNetwork,
      login: this.credentialsForm.value.login,
      password: this.credentialsForm.value.password,
      phone: this.credentialsForm.value.phone,
      proxyCountryCode: this.credentialsForm.value.proxyCountryCode,
      proxyCity: this.credentialsForm.value.proxyCity
    };
    this.updateConnection.emit({
      avatarId: this.avatarId,
      connection: connectionDetails,
      connectionId: connectionDetails.type
    });
  }

  unlink() {
    this.submitted = true;
    if (this.credentialsForm.invalid) {
      return;
    }
    this.userProfile.isLoading = true;
    const connectionDetails = {
      enabled: false,
      type: this.socialNetwork,
      login: this.userProfile.login,
      password: this.userProfile.password,
      phone: this.userProfile.phone,
      proxyCountryCode: this.credentialsForm.value.proxyCountryCode,
      proxyCity: this.credentialsForm.value.proxyCity
    };
    this.updateConnection.emit({
      avatarId: this.avatarId,
      connection: connectionDetails,
      connectionId: connectionDetails.type
    });
  }

  setProxyCityList($event) {
    const country = this.proxies.find(item => item.countryCode === $event.value);
    this.credentialsForm.controls.proxyCity.patchValue(null);

    if (country && country.cities.length) {
      this.proxyCityList = country.cities;
      this.credentialsForm.controls.proxyCity.enable();
    } else {
      this.proxyCityList = [];
      this.credentialsForm.controls.proxyCity.disable();
    }
  }

  getName() {
    return `${this.userProfile.firstName || ''} ${this.userProfile.lastName || ''}`;
  }

  copyToClipboard(text: string) {
    this._clipboardService.copyFromContent(text);
  }
}

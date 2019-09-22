import { Component, ElementRef, OnInit, Output, ViewChild, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { AvatarDetails, AvatarLang } from '../models/avatar.model';
import { DictionaryService } from '@app/core/services/dictionary/dictionary.service';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { CustomFormValidators } from '@app/shared/services/custom-form-validators.service';

_('avatar.labels.religiousViews');
_('avatar.labels.politicalViews');
_('avatar.labels.maritalStatus');
_('avatar.labels.occupation');
_('avatar.labels.educations');
_('avatar.labels.livesInLocation');
_('avatar.labels.fromLocation');
_('avatar.labels.favoriteMusic');
_('avatar.labels.favoriteMovies');
_('avatar.labels.favoriteBooks');
_('avatar.labels.favoriteTvShows');
_('avatar.labels.favoriteAppsAndGames');
_('avatar.labels.favoriteSports');
_('avatar.labels.professionalSkills');

@Component({
  selector: 'app-avatar-form',
  templateUrl: './avatar-form.component.html',
  styleUrls: ['./avatar-form.component.scss']
})

export class AvatarFormComponent implements OnInit {
  avatarForm: FormGroup;
  submitted = false;
  isFirstChanged = false;
  languages: AvatarLang[];
  isCreateDisabled = false;
  id: number;
  public currentDate = new Date();

  @Input() avatarDetails: AvatarDetails;
  @Output() submitForm = new EventEmitter();
  @Output() submitFailed = new EventEmitter();
  @Output() setIsDirty = new EventEmitter();

  aboutBlocks = {
    socialState: [],
    interests: [],
    education: [],
    geoLocation: []
  };

  /**
   * Default Avatar values
   */
  public avatar: Partial<AvatarDetails> = {
    type: 'BABY',
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    birthDate: '',
    bio: '',
    languages: [],
    profilePicBase64: '',
    profilePicName: '',
    socialLinks: [],
    emails: [],
    websites: [],
    phones: [],
    educations: [],
    favoriteBooks: '',
    favoriteMovies: '',
    favoriteMusic: '',
    favoriteTvShows: '',
    favoriteSports: '',
    favoriteAppsAndGames: '',
    fromLocation: {},
    livesInLocation: {},
    maritalStatus: '',
    // occupations: [], // DEPRECATED!
    politicalViews: '',
    religiousViews: '',
    professionalSkills: ''
  };

  // https://angular.io/guide/static-query-migration#why-do-i-have-to-specify-static-false-isnt-that-the-default
  @ViewChild('emails', { static: false }) emails: ElementRef;
  @ViewChild('phones', { static: false }) phones: ElementRef;
  @ViewChild('websites', { static: false }) websites: ElementRef;
  @ViewChild('socialLinks', { static: false }) socialLinks: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private dictionaryService: DictionaryService,
  ) {}

  chipsInputs = {
    socialLinks: new FormControl('', [
      Validators.maxLength(8192),
      CustomFormValidators.validateUrl
    ]),
    websites: new FormControl('', [
      Validators.maxLength(8192),
      CustomFormValidators.validateUrl
    ]),
    phones: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(32),
      Validators.pattern('[0-9+)( -]+')
    ]),
    emails:  new FormControl('', [
      CustomFormValidators.validateEmail
    ])
  };

  ngOnInit() {
    this.languages = this.dictionaryService.getLanguages().map(item => ({ id: item, text: item }));
    this.avatar = {
      ...this.avatar,
      ...this.avatarDetails
    };
    this.createForm();
  }

  get f() {
    return this.avatarForm.controls;
  }

  submit() {
    this.submitted = true;
    if (this.avatarForm.invalid) {
      this.submitFailed.emit(this.avatarForm);
      return;
    }
    this.submitForm.emit(this.avatarForm.value);
  }

  private createForm() {
    this.avatarForm = this.formBuilder.group({
      type: [this.avatar.type, {validators: []}],
      firstName: [this.avatar.firstName, {
        validators: [
          Validators.required,
          Validators.maxLength(256),
          CustomFormValidators.validateName
        ]
      }],
      lastName: [this.avatar.lastName, {
        validators: [
          Validators.required,
          Validators.maxLength(256),
          CustomFormValidators.validateName
        ]
      }],
      middleName: [this.avatar.middleName, {
        validators: [
          Validators.maxLength(256),
          CustomFormValidators.validateName
        ]
      }],
      gender: [this.avatar.gender, {validators: []}],
      birthDate: [this.avatar.birthDate, {validators: []}],
      bio: [this.avatar.bio, {validators: []}],
      languages: this.formBuilder.array(this.avatar.languages.map(item => ({ id: item, text: item }))),
      phones: this.formBuilder.array(this.avatar.phones),
      emails: this.formBuilder.array(this.avatar.emails),
      socialLinks: this.formBuilder.array(this.avatar.socialLinks),
      websites: this.formBuilder.array(this.avatar.websites),
      // occupations: this.formBuilder.array(this.avatar.occupations), // DEPRECATED!
      educations: this.formBuilder.array(this.avatar.educations),
      religiousViews: [this.avatar.religiousViews, {validators: []}],
      politicalViews: [this.avatar.politicalViews, {validators: []}],
      professionalSkills: [this.avatar.professionalSkills, {validators: []}],
      maritalStatus: [this.avatar.maritalStatus, {validators: []}],
      fromLocation: [this.avatar.fromLocation, {validators: []}],
      livesInLocation: [this.avatar.livesInLocation, {validators: []}],
      favoriteMovies: [this.avatar.favoriteMovies, {validators: []}],
      favoriteMusic: [this.avatar.favoriteMusic, {validators: []}],
      favoriteBooks: [this.avatar.favoriteBooks, {validators: []}],
      favoriteTvShows: [this.avatar.favoriteTvShows, {validators: []}],
      favoriteAppsAndGames: [this.avatar.favoriteAppsAndGames, {validators: []}],
      favoriteSports: [this.avatar.favoriteSports, {validators: []}],
      profilePicBase64: [this.avatar.profilePicBase64, {validators: []}],
      profilePicName: [this.avatar.profilePicName, {validators: []}],
    });

    this.avatarForm
      .valueChanges
      .subscribe(() => {
        if (!this.isFirstChanged) {
          this.setIsDirty.emit(true);
          this.isFirstChanged = true;
        }
      });
  }

  updateProfilePic({ pic, name }) {
    const profilePicBase64Control = <FormArray>this.f.profilePicBase64;
    const profilePicNameControl = <FormArray>this.f.profilePicName;
    profilePicBase64Control.patchValue(pic);
    profilePicNameControl.patchValue(name);
  }

  addContact(name, $event) {
    const value = $event.value.trim();
    if (name && this.chipsInputs[name].valid && value) {
      const control = <FormArray>this.f[name];
      control.push(this.formBuilder.control(value));
      this.chipsInputs[name].setValue('');
    }
  }

  removeContact(name, index) {
    const control = <FormArray>this.f[name];
    control.removeAt(index);
  }

  /**
   * Create value in form array
   * @param name - control name
   * @param data - some data
   */
  createFormArrayValue (name, data) {
    const control = <FormArray>this.f[name];
    control.push(this.formBuilder.control(data));
  }

  /**
   * Update value in form array
   * @param name - control name
   * @param data - some data
   * @param index - index in array
   */
  updateFormArrayValue(name, data, index) {
    const control = <FormArray>this.f[name];
    control.at(index).patchValue(data);
  }

  /**
   * Delete value from form array
   * @param name - control name
   * @param index - index in array
   */
  deleteFormArrayValue(name, index) {
    const control = <FormArray>this.f[name];
    control.removeAt(index);
  }

  /**
   * Update value in form control
   * @param name - control name
   * @param data - some data
   */
  updateFormControlValue(name, data) {
    const control = <FormArray>this.f[name];
    control.patchValue(data);
  }

  /**
   * Clear value in form control
   * @param name - control name
   */
  deleteFormControlValue(name) {
    const control = <FormArray>this.f[name];
    control.patchValue(null);
  }
}

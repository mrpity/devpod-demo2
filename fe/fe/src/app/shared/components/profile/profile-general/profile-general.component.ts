import { Component, Input, OnInit } from '@angular/core';
import { PostOutput } from '@app/search/models/post.model';
import * as moment from 'moment';
import { ProfileOutput } from '@app/search/models/profile.model';

@Component({
  selector: 'app-profile-general',
  templateUrl: './profile-general.component.html',
  styleUrls: ['./profile-general.component.scss']
})
export class ProfileGeneralComponent implements OnInit {

  languagesString = '';

  @Input()
  isResultsLoadingFailure: boolean;

  private _profile: Partial<ProfileOutput>;
  @Input()
  set profile(data) {
    this._profile = data;
    this.languagesString = data && data.languages ? data.languages.join(', ') : '';
  }
  get profile() {
    return this._profile;
  }

  @Input()
  isLoading: boolean;

  constructor() { }

  ngOnInit() {
  }

  /**
   * TODO: MOVE TO HELPERS!
   * @param bithDate
   */
  calculateAge(bithDate) {
    return moment().diff(moment(bithDate), 'years');
  }

}

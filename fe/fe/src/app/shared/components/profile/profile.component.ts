import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProfileOutput } from '@app/search/models/profile.model';

_('navigation.details');
_('navigation.index.posts');

_('profile.aboutBlocks.religiousViews');
_('profile.aboutBlocks.politicalViews');
_('profile.aboutBlocks.maritalStatus');
_('profile.aboutBlocks.familyMember');
_('profile.aboutBlocks.occupation');
_('profile.aboutBlocks.education');
_('profile.aboutBlocks.livesInLocation');
_('profile.aboutBlocks.fromLocation');
_('profile.aboutBlocks.favoriteAnimal');
_('profile.aboutBlocks.favoriteCar');
_('profile.aboutBlocks.favoriteBook');
_('profile.aboutBlocks.favoriteFood');
_('profile.aboutBlocks.favoriteGame');
_('profile.aboutBlocks.favoriteMovie');
_('profile.aboutBlocks.favoriteMusic');
_('profile.aboutBlocks.favoriteTvShows');
_('profile.aboutBlocks.favoriteHealthAndBeauty');
_('profile.aboutBlocks.favoriteSport');
_('profile.aboutBlocks.otherInterests');
_('profile.aboutBlocks.favoriteScience');
_('profile.aboutBlocks.favoriteTravelsAndTourism');
_('profile.aboutBlocks.professionalSkills');
_('profile.aboutBlocks.armyList');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  @Input() isResultsLoadingFailure: boolean;
  @Input() profileData: ProfileOutput;
  @Input() friends: any[];
  @Input() isLoading: boolean;
  @Input() forModule: string;
  @Input() currentTabIndex: number;

  @Output() changeTab = new EventEmitter();

  constructor() { }

  onChangeTab($event) {
    this.changeTab.emit($event);
  }
}



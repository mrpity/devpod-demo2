import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import {DictionaryService} from '@app/core/services/dictionary/dictionary.service';
import { AvatarDetails } from '../../models/avatar.model';
import { Store , select } from '@ngrx/store';
import { AvatarStoreState, AvatarStoreSelectors } from '../../store';

@Component({
  selector: 'app-general-tab',
  templateUrl: './general-tab.component.html',
  styleUrls: ['./general-tab.component.scss']
})

export class GeneralTabComponent implements OnInit {
  id: number;
  avatarDetails: AvatarDetails;
  languagesString: string;

  constructor(
    private dictionaryService: DictionaryService,
    private store$: Store<AvatarStoreState.State>
  ) { }

  ngOnInit() {
    this.store$.pipe(
      select(
        AvatarStoreSelectors.getSelectedDetails
      )
    ).subscribe(data => {
      this.avatarDetails = data;
      this.languagesString = this.getLanguages(data ? data.languages : null);
    });
  }

  getLanguages(langs) {
    return langs ? langs.join(', ') : '';
  }

  calculateAge(bithDate) {
    return moment().diff(moment(bithDate), 'years');
  }
}

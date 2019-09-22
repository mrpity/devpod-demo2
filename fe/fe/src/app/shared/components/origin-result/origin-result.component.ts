import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Result } from '@app/search/models/result.model';
import { FilterByService } from '@app/search/services/filter-by.service';
import { HelpersService } from '@app/shared/services/helpers.service';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';


_('search.results.label.new');

@Component({
  selector: 'app-origin-result',
  templateUrl: './origin-result.component.html',
  styleUrls: ['./origin-result.component.scss']
})
export class OriginResultComponent implements OnInit {


  @Input()
  result: Partial<Result>;

  @Input()
  index: number;

  constructor(public filterBy: FilterByService, public helpers: HelpersService) { }

  ngOnInit() {
  }

  showPostDate(date: string) {
    if (moment(date, moment.ISO_8601).isValid()) {
      return moment(date).format('HH:mm DD.MM.YYYY');
    }
    return date;
  }

}

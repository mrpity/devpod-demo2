import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NerFieldsPostEnum, PostOutput } from '@app/search/models/post.model';

@Component({
  selector: 'app-post-general',
  templateUrl: './post-general.component.html',
  styleUrls: ['./post-general.component.scss']
})
export class PostGeneralComponent implements OnInit {

  _details: PostOutput;
  summaryDescription: string;
  descriptionData = {};
  type: string;
  showMore = false;
  rows = Object.keys(NerFieldsPostEnum);
  currentTabIndex = 0;

  @Input() isResultsLoadingFailure: boolean;
  @Input() isPostGeneralLoading: boolean;

  @Input() set details(data) {
    this._details = data;
    if (data) {
      this.type = data.type.toLowerCase();
      this.checkReactions(this.details);
      if (data.summary && data.summary.length > 1000) {
        this.summaryDescription = data.summary.slice(0, 650) + '...';
      }
      this.rows.forEach(row => {
        if (Array.isArray(data[row]) && data[row].length > 6) {
          this.descriptionData[row] = data[row].slice(0, 4);
          this.descriptionData[row].showMore = false;
        }
      });
    }
  }

  get details(): PostOutput {
    return this._details;
  }

  constructor() { }

  ngOnInit() { }

  checkReactions(details) {
    if (!!details.reactions.length) {
      this.currentTabIndex = 0;
    } else if (!!details.reposts.length) {
      this.currentTabIndex = 1;
    } else if (!!this.details.comments.length) {
      this.currentTabIndex = 2;
    }
  }

  reactionsCount(reactions) {
    let acc = 0;

    reactions.forEach((item) => {
      acc += item.users.length;
    });

    return acc;
  }
}

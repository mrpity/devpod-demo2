import { Component, Input, OnInit } from '@angular/core';
import { WebPageOutput } from '@app/search/models/webpage.model';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { NerFieldsWebPageEnum } from '@app/search/models/webpage.model';

_('search.results.details.webpage.sentimentLabel');
_('search.results.details.webpage.language');
_('search.results.details.webpage.dates');
_('search.results.details.webpage.locations');
_('search.results.details.webpage.hashtags');
_('search.results.details.webpage.organizations');
_('search.results.details.webpage.phones');
_('search.results.details.webpage.persons');
_('search.results.details.webpage.emails');
_('search.results.details.webpage.users');
_('search.results.details.webpage.urls');



@Component({
  selector: 'app-web-general',
  templateUrl: './web-general.component.html',
  styleUrls: ['./web-general.component.scss'],
})

export class WebGeneralComponent implements OnInit {

  sourceLink: string;
  summaryDescription: string;
  summary: string;
  rows = Object.keys(NerFieldsWebPageEnum);
  _details: Partial<WebPageOutput>;
  type: string;
  showMore = false;

  @Input()
  set details(data) {
    this._details = data;
    if (data) {
      this.type = data.type.toLowerCase();
      this.sourceLink = data.sourceLink ? data.sourceLink.split('//')[1] : '';
      if (data.summary && data.summary.length > 1000) {
        this.summaryDescription = data.summary.slice(0, 650) + '...';
      }
    }
  }

  get details() {
     return this._details;
  }

  @Input()
  isLoading: boolean;

  @Input()
  isResultsLoadingFailure: boolean;

  constructor() { }

  ngOnInit() {
  }


  scrollTop(): void {
    let top = document.querySelector('.header');
    if (top !== null) {
      top.scrollIntoView({behavior: 'smooth'});
      top = null;
    }
  }

  isGoTop() {
    const textEl = document.getElementById('item_content');
    return textEl && textEl.getBoundingClientRect().top < 0;
  }

  get webPageColumn() {
    return NerFieldsWebPageEnum;
  }

  isSingleValue(row): boolean {
    return [this.webPageColumn.sentimentLabel, this.webPageColumn.language].includes(row);
  }
}

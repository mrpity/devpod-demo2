import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WebPageOutput } from '@app/search/models/webpage.model';

@Component({
  selector: 'app-web-details',
  templateUrl: './web-details.component.html',
  styleUrls: ['./web-details.component.scss']
})
export class WebDetailsComponent {

  @Input() webPageData: WebPageOutput;
  @Input() origins: any[];
  @Input() isLoading: boolean;
  @Input() forModule: string;
  @Input() currentTabIndex: boolean;

  @Output() changeTab = new EventEmitter();

  constructor() { }

  onChangeTab($event) {
    this.changeTab.emit($event);
  }
}

import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { PostOutput } from '@app/search/models/post.model';
import { Result } from '@app/search/models/result.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent {

  @Input() isOriginsLoadingFailure: boolean;
  @Input() isOriginsLoading: boolean;
  @Input() postData: PostOutput;
  @Input() origins: Result[];
  @Input() isPostGeneralLoading: boolean;
  @Input() isResultsLoadingFailure: boolean;
  @Input() forModule: string;
  @Input() currentTabIndex: boolean;

  @Output() changeTab = new EventEmitter();
  @Output() openOrigin = new EventEmitter();

  constructor() { }

  onChangeTab($event) {
    this.changeTab.emit($event);
  }

}

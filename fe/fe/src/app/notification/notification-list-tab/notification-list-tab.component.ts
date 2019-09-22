import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NOTIFICATION_TYPES } from '../notification.enums';

@Component({
  selector: 'app-notification-list-tab',
  templateUrl: './notification-list-tab.component.html',
  styleUrls: ['./notification-list-tab.component.scss']
})
export class NotificationListTabComponent implements OnInit {

  message: string;

  @Input() notifications: any;
  @Input() dates: string[];
  @Input() isLoading: boolean;
  @Input() isLoadMore: boolean;
  @Input() type: NOTIFICATION_TYPES;

  @Output() loadMore = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  loadMoreData() {
    this.loadMore.emit();
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-list-item',
  templateUrl: './notification-list-item.component.html',
  styleUrls: ['./notification-list-item.component.scss']
})
export class NotificationListItemComponent implements OnInit {

  @Input() notification: any;

  constructor(
    public translate: TranslateService
  ) { }

  ngOnInit() { }

}

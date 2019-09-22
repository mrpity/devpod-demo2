import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OriginPagination} from '@app/search/models/post.model';
import {Result} from '@app/search/models/result.model';

@Component({
  selector: 'app-profile-friends',
  templateUrl: './profile-friends.component.html',
  styleUrls: ['./profile-friends.component.scss']
})
export class ProfileFriendsComponent {

  @Input() friends: any[];
  @Input() isLoading: boolean;
  @Input() pagination: OriginPagination;

  constructor() { }
}

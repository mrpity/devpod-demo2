import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Result } from '@app/search/models/result.model';
import { OriginPagination } from '@app/search/models/post.model';

@Component({
  selector: 'app-post-origins',
  templateUrl: './post-origins.component.html',
  styleUrls: ['./post-origins.component.scss']
})
export class PostOriginsComponent implements OnInit {

  @Input()
  origins: Result[];

  @Input()
  isOriginsLoading: Boolean;

  @Input()
  pagination: OriginPagination;

  @Input()
  isOriginsLoadingFailure: Boolean;

  @Output()
  openOrigin = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}

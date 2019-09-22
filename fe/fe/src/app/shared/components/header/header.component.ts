import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  headerName: string;

  @Input()
  breadcrumbs: string[];

  @Input()
  breadcrumbsId: string;

  @Output()
  emitAction = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}

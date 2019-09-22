import { Component, Input, OnInit } from '@angular/core';

export interface BreadCrumb {
  label: string;
  route: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  @Input() items: BreadCrumb[];
  @Input() id: string;

  constructor() {
  }

  ngOnInit() {
  }


}

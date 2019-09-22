import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-about-block',
  templateUrl: './about-block.component.html',
  styleUrls: ['./about-block.component.scss']
})
export class AboutBlockComponent implements OnInit {
  @Input('qa_id') qa_id: string;
  @Input('data') data: any;
  @Input('isEducation') isEducation: boolean;
  @Input('isGeolocation') isGeolocation: boolean;
  constructor() { }

  ngOnInit() {
  }

}

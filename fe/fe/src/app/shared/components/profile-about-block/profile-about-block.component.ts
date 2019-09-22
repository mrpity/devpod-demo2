import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-about-block',
  templateUrl: './profile-about-block.component.html',
  styleUrls: ['./profile-about-block.component.scss']
})
export class ProfileAboutBlockComponent {
  @Input() qa_id: string;
  @Input() data: any;
  @Input() isEducation: boolean;
  @Input() isGeolocation: boolean;

  constructor() { }
}

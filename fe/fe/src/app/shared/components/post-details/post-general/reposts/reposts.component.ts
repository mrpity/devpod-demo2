import {Component, Input, OnInit} from '@angular/core';
import {ProfileLinkOutput} from '@app/search/models/post.model';

@Component({
  selector: 'app-reposts',
  templateUrl: './reposts.component.html',
  styleUrls: ['./reposts.component.scss']
})
export class RepostsComponent implements OnInit {

  @Input() reposts: ProfileLinkOutput[];

  constructor() { }

  ngOnInit() {
  }

}

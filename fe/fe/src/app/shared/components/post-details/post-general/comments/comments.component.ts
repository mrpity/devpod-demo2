import {Component, Input, OnInit} from '@angular/core';
import {HelpersService} from '@app/shared/services/helpers.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input () comments: any[];

  constructor(public helpers: HelpersService) { }

  ngOnInit() {
  }
}

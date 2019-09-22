import {Component, Input, OnInit} from '@angular/core';
import {ReactionOutput} from '@app/search/models/result.model';

@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.scss']
})

export class ReactionsComponent implements OnInit {

  @Input() reactions: ReactionOutput[];

  constructor() { }

  ngOnInit() {}

}

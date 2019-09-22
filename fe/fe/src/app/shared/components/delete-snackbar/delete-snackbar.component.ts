import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';


@Component({
  selector: 'app-delete-snackbar',
  templateUrl: './delete-snackbar.component.html',
  styleUrls: ['./delete-snackbar.component.scss']
})
export class DeleteSnackbarComponent implements OnInit {

  @Output() action = new EventEmitter<any>();
  @Input() message: string;

  constructor() { }

  ngOnInit() {
  }
}

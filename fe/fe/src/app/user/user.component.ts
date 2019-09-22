import { Component, OnInit } from '@angular/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

_('user.validation.updateSuccess');
_('user.validation.createFailed');
_('user.validation.createSuccess');
_('user.validation.errorsMsg');
_('user.validation.EMAIL_ALREADY_EXISTS');
_('user.roles.ADMIN');
_('user.roles.OPERATOR');
_('user.roles.SUPERVISOR');

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}

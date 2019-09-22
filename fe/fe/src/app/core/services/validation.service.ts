import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private _emailRegEx   = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  private _loginPhoneRegEx = new RegExp(/^\+?[0-9]*$/);

  get  emailRegEx() {
    return this._emailRegEx;
  }

  get  loginPhoneRegEx() {
    return this._loginPhoneRegEx;
  }

  constructor() { }
}

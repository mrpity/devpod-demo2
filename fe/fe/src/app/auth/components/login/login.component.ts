import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/index';
import { ValidationService } from '@app/core/services/validation.service';
import { Store } from '@ngrx/store';
import { RootStoreState, RootActions } from '../../../store';
import { Login } from '@app/auth/auth.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  recoverForm: FormGroup;
  submitted  = false;
  recoverSuccessMsg = false;
  recoverSubmitted = false;
  isRecoverDisabled = false;
  loginDisabled = false;
  isRecoverView = false;
  invalidUserMsg = false;
  serverErrors = {
    username: false,
    password: false
  };
  loginAttemptInterval$: Observable<number>;
  loginAttempts = 0;
  source;

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private validationService: ValidationService,
    private store$: Store<RootStoreState.State>
  ) {
    this.loginAttemptInterval$ = this.authService.loginTimeout;
  }

  ngOnInit() {
    this.authService.clearStorage();
    this.createForm();
    this.loginAttemptInterval$.subscribe((val) => {
      if (val === 0) {
        this.loginDisabled = false;
      }
    });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', {validators: [Validators.required, Validators.pattern(this.validationService.emailRegEx)]}],
      password: ['', {validators: [Validators.required]}]
    });
    this.recoverForm = this.formBuilder.group({
      email: ['', {validators: [Validators.required, Validators.pattern(this.validationService.emailRegEx)]}],
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  recover() {

    this.recoverSubmitted = true;

    if ( this.recoverForm.invalid ) {
      return;
    }
    this.isRecoverDisabled = true;
    this.invalidUserMsg = false;
    const email = this.recoverForm.get('email').value;
    this.authService.recoverPassword(email).subscribe((data) => {
      if (data.status === 'RECOVERED') {
        this.invalidUserMsg = false;
        this.isRecoverView = false;
        this.recoverSuccessMsg = true;
      } else if (data.status === 'INVALID_USER') {
        this.invalidUserMsg = true;
      }
      this.isRecoverDisabled = false;
    });


  }
  onSubmit() {
    this.recoverSuccessMsg = false;
    this.submitted = true;

    if ( this.loginForm.invalid || this.loginDisabled) {
      return;
    }
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.loginDisabled = true;

    this.authService.login(username, password ).subscribe(({ data }: Login) => {
      if (data.login) {
        this.authService.setToken(data.login);
        this.loginDisabled = false;
        this.router.navigate(['app']);
      }
    }, (error) => {
      this.serverErrors.username = false;
      this.serverErrors.password = false;
      if (error.graphQLErrors && error.graphQLErrors[0]) {
        if (error.graphQLErrors[0].message === 'invalid_user') {
          this.serverErrors.username = true;
        } else if (error.graphQLErrors[0].message === 'invalid_password') {
          this.serverErrors.password = true;
        }
      }
      this.loginAttempts++;
      if (this.loginAttempts === 3 ) {
        this.authService.startLoginTimeout();
        this.loginAttempts = 0;
      } else {
        this.loginDisabled = false;
      }
      console.log('there was an error sending the query', error);
    });
  }

}

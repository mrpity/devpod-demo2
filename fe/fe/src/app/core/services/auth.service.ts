import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { SnackBarComponent } from '@app/shared/components/snack-bar/snack-bar.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, map } from 'rxjs/internal/operators';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { Logout } from '@app/auth/auth.model';

_('logout.notification');


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.checkToken());
  private secondsLeft = new BehaviorSubject<number>(0);
  private timeoutInterval: number;
  private lastAttempt$ = new BehaviorSubject<number>(Date.now());
  private checkActivityInterval: number;
  private idleTimeout = 300000;
  get isLoggedIn () {
    return this.loggedIn.asObservable();
  }

  get loginTimeout() {
    return this.secondsLeft.asObservable();
  }

  constructor(
    private router: Router,
    private apollo: Apollo,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialog
  ) {}

  startCheckingActivity() {
    this.lastAttempt$.pipe(
      debounceTime(500),
    ).subscribe((val) => {
      localStorage.setItem('lastActivityTimestamp', val.toString());
    });
    this.checkActivityInterval = window.setInterval(() => {
      this.checkActivity();
    }, 1000);
  }

  checkActivity() {
    const lastAttempt = localStorage.getItem('lastActivityTimestamp');
    const currentTimestamp = Date.now();
    if (!lastAttempt) {
      return;
    } else if ( currentTimestamp - (parseInt(lastAttempt, 10)) > this.idleTimeout) {
      this.logout();
    }
  }

  updateActivity() {
    this.lastAttempt$.next(Date.now());
  }

  startLoginTimeout() {
    localStorage.removeItem('lastAttempt');
    if (this.timeoutInterval) {
      window.clearInterval(this.timeoutInterval);
    }
    let timeout = 60;
    this.timeoutInterval = window.setInterval(() => {
      this.secondsLeft.next(--timeout);
      if (timeout === 0) {
        window.clearInterval(this.timeoutInterval);
      }
    }, 1000);
  }

  checkToken () {
    const token = localStorage.getItem('token');
    return !!token;
  }

  login(username: string, password: string) {
    const login = gql(`
      mutation login($input:LoginInput!) {
          login (input: $input)
      }
     `);

    return this.apollo.mutate({
      mutation: login,
      variables: {
        input: {
          email: username,
          password: password
        }
      }
    });

  }

  setToken(token) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  clearStorage() {
    localStorage.removeItem('token');
    // prevent async setting of lastActivityTimestamp after logout
    setTimeout(() => {localStorage.removeItem('lastActivityTimestamp'); }, 1000);
  }

  logout() {
    const logout = gql(`
        mutation logout {logout}
    `);
    this.apollo.mutate({
      mutation: logout
    }).subscribe(({ data }: Logout) => {
      if (data && data.logout) {
        this.clearLoginData();
      }
    });
  }

  clearLoginData() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    clearInterval(this.checkActivityInterval);
    this.dialogRef.closeAll();
    this.openSnackBar('logout.notification');
    this.clearStorage();
  }

  recoverPassword(email: string) {
    const recoverPassword = gql(`
      mutation recoverPassword($email: String!) {
          recoverPassword (email: $email){
            status
          }
      }
     `);

    return this.apollo.mutate({
      mutation: recoverPassword,
      variables: {
        email: email
      }
    }).pipe(map((response: any) => {
      return response.data.recoverPassword;
    }));
  }

  openSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message
      },
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'logout',
    });
  }
}

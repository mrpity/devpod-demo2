import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { of, Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('AuthService', () => {
  let service: AuthService;
  const fakeRouter = {
    navigate: () => { }
  };
  const fakeApollo = {
    mutate: () => { }
  };
  const fakeSnackBar = {
    openFromComponent: () => { }
  };
  const fakeDialogRef = {
    closeAll: () => { }
  };

  beforeEach(() => {
    service = new AuthService(
      <any>fakeRouter,
      <any>fakeApollo,
      <any>fakeSnackBar,
      <any>fakeDialogRef
    );
  });

  describe('#checkActivity >>', () => {
    it('should return undefined if it was no attemps', () => {
      localStorage.removeItem('lastActivityTimestamp');
      expect(service.checkActivity()).toEqual(undefined);
    });

    it('should call logout if actual idle time is bigger than idleTimeout', () => {
      localStorage.setItem('lastActivityTimestamp', Date.now().valueOf() - 300001 + '');
      spyOn(AuthService.prototype, 'logout');
      service.checkActivity();
      expect(AuthService.prototype.logout).toHaveBeenCalled();
    });

    it('should not call logout if actual idle time is smaller than idleTimeout', () => {
      localStorage.setItem('lastActivityTimestamp', Date.now().valueOf() - 299999 + '');
      spyOn(AuthService.prototype, 'logout');
      service.checkActivity();
      expect(AuthService.prototype.logout).not.toHaveBeenCalled();
    });
  });

  describe('#setToken >>', () => {
    it('should set properly token in localStorage', () => {
      const token = '1111';
      service.setToken(token);
      expect(localStorage.getItem('token')).toEqual(token);
    });
  });

  describe('#clearStorage >>', () => {
    it('should remove token and lastActivityTimestamp from storage', () => {
      const token = '1111';
      localStorage.setItem('token', token);
      expect(localStorage.getItem('token')).toEqual(token);
      service.clearStorage();
      expect(localStorage.getItem('token')).toEqual(null);
    });
  });

  describe('#checkToken >>', () => {
    beforeEach(() => {
      const token = '1111';
      localStorage.setItem('token', token);
    });

    it('should return true if token exist', () => {
      expect(service.checkToken()).toEqual(true);
    });

    it('should return false if token doesn`t exist', () => {
      localStorage.removeItem('token');
      expect(service.checkToken()).toEqual(false);
    });
  });

  describe('#login >>', () => {
    const username = 'username';
    const password = 'password';
    const mockParams = {
      mutation: jasmine.any(Object),
      variables: {
        input: {
          email: username,
          password: password
        }
      }
    };

    it('should send login request with username and password', () => {
      spyOn(fakeApollo, 'mutate');
      service.login('username', 'password');
      expect(fakeApollo.mutate).toHaveBeenCalledWith(mockParams);
    });

  });

  describe('#logout >>', () => {
    const mockParams = {
      mutation: jasmine.any(Object),
    };

    const logoutResponseData = {
      data: { logout: {} }
    };

    // it('should send properly logout request', () => {
    //   spyOn(fakeApollo, 'mutate').and.returnValue(of({ data: {} }));
    //   service.logout();
    //   expect(fakeApollo.mutate).toHaveBeenCalledWith(mockParams);
    // });

    // it('should properly react on logout response if data.logout info present', () => {
    //   spyOn(fakeApollo, 'mutate').and.returnValue(of(logoutResponseData));
    //   spyOn(fakeRouter, 'navigate');
    //   spyOn(fakeDialogRef, 'closeAll');
    //   spyOn(fakeSnackBar, 'openFromComponent');
    //   service.logout();
    //   expect(fakeRouter.navigate).toHaveBeenCalled();
    //   expect(fakeDialogRef.closeAll).toHaveBeenCalled();
    //   expect(fakeSnackBar.openFromComponent).toHaveBeenCalled();
    // });

  });
});

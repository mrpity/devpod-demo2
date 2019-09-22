import { CoreModule } from './core.module';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {TestBed} from '@angular/core/testing';

xdescribe('CoreModule', () => {
  let coreModule: CoreModule;

  beforeEach(() => {
    coreModule = new CoreModule(TestBed.get(CoreModule, null));
  });

  it('should create an instance', () => {
    expect(coreModule).toBeTruthy();
  });
});

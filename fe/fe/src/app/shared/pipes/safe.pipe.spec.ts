import { SafePipe } from './safe.pipe';
// import { MockComponent } from 'mock-component';
import { DomSanitizer } from '@angular/platform-browser';

const DomSanitizerMock = {};

xdescribe('SafePipe', () => {
  it('create an instance', () => {
    const pipe = new SafePipe(DomSanitizerMock as DomSanitizer);
    expect(pipe).toBeTruthy();
  });
});

import { TimeFramePipe } from './time-frame.pipe';

xdescribe('TimeFramePipe', () => {
  it('create an instance', () => {
    const pipe = new TimeFramePipe();
    expect(pipe).toBeTruthy();
  });
});

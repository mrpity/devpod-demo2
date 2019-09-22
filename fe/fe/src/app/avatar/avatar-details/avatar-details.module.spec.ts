import { AvatarDetailsModule } from './avatar-details.module';

xdescribe('AvatarDetailsModule', () => {
  let avatarDetailsModule: AvatarDetailsModule;

  beforeEach(() => {
    avatarDetailsModule = new AvatarDetailsModule();
  });

  it('should create an instance', () => {
    expect(avatarDetailsModule).toBeTruthy();
  });
});

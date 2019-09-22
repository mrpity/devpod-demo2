import { AvatarModule } from './avatar.module';

xdescribe('AvatarModule', () => {
  let avatarModule: AvatarModule;

  beforeEach(() => {
    avatarModule = new AvatarModule();
  });

  it('should create an instance', () => {
    expect(avatarModule).toBeTruthy();
  });
});

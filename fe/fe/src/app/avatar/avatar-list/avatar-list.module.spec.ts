import { AvatarListModule } from './avatar-list.module';

xdescribe('AvatarListModule', () => {
  let avatarListModule: AvatarListModule;

  beforeEach(() => {
    avatarListModule = new AvatarListModule();
  });

  it('should create an instance', () => {
    expect(avatarListModule).toBeTruthy();
  });
});

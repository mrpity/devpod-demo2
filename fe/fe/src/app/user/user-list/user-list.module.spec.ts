import { UserListModule } from './user-list.module';

xdescribe('AvatarListModule', () => {
  let avatarListModule: UserListModule;

  beforeEach(() => {
    avatarListModule = new UserListModule();
  });

  it('should create an instance', () => {
    expect(avatarListModule).toBeTruthy();
  });
});

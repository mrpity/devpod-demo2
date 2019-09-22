import { AvatarCreateModule } from './avatar-create.module';

xdescribe('AvatarCreateModule', () => {
  let avatarCreateModule: AvatarCreateModule;

  beforeEach(() => {
    avatarCreateModule = new AvatarCreateModule();
  });

  it('should create an instance', () => {
    expect(avatarCreateModule).toBeTruthy();
  });
});

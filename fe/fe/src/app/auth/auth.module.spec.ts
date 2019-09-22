import { AuthModule } from './auth.module';

xdescribe('AuthModule', () => {
  let authModule: AuthModule;

  beforeEach(() => {
    authModule = new AuthModule();
  });

  it('should create an instance', () => {
    expect(authModule).toBeTruthy();
  });
});

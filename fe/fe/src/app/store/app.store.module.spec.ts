import { AppStoreModule } from './app.store.module';

xdescribe('AppStoreModule', () => {
  let rootStoreModule: AppStoreModule;

  beforeEach(() => {
    rootStoreModule = new AppStoreModule();
  });

  it('should create an instance', () => {
    expect(rootStoreModule).toBeTruthy();
  });
});

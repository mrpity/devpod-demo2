import { LinksTabModule } from './links-tab.module';

describe('LinksTabModule', () => {
  let linksTabModule: LinksTabModule;

  beforeEach(() => {
    linksTabModule = new LinksTabModule();
  });

  it('should create an instance', () => {
    expect(linksTabModule).toBeTruthy();
  });
});

import { GeneralTabModule } from './general-tab.module';

describe('GeneralTabModule', () => {
  let generalTabModule: GeneralTabModule;

  beforeEach(() => {
    generalTabModule = new GeneralTabModule();
  });

  it('should create an instance', () => {
    expect(generalTabModule).toBeTruthy();
  });
});

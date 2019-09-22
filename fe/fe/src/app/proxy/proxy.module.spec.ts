import { ProxyModule } from './proxy.module';

xdescribe('ProxyModule', () => {
  let proxyModule: ProxyModule;

  beforeEach(() => {
    proxyModule = new ProxyModule();
  });

  it('should create an instance', () => {
    expect(proxyModule).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { ProxyService } from './proxy.service';

xdescribe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProxyService]
    });
  });

  it('should be created', inject([ProxyService], (service: ProxyService) => {
    expect(service).toBeTruthy();
  }));
});

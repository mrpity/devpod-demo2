import { TestBed, inject } from '@angular/core/testing';

import { DataSourceService } from './data-source.service';

xdescribe('DataSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DataSourceService, useValue: [] } ]
    });
  });

  it('should be created', inject([DataSourceService], (service: DataSourceService) => {
    expect(service).toBeTruthy();
  }));
});

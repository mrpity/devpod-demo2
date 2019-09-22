import { TestBed, inject } from '@angular/core/testing';

import { AvatarService } from './avatar.service';

xdescribe('AvatarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvatarService]
    });
  });

  it('should be created', inject([AvatarService], (service: AvatarService) => {
    expect(service).toBeTruthy();
  }));
});

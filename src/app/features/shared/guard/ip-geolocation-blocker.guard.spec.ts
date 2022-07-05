import { TestBed } from '@angular/core/testing';

import { IpGeolocationBlockerGuard } from './ip-geolocation-blocker.guard';

describe('IpGeolocationBlockerGuard', () => {
  let guard: IpGeolocationBlockerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IpGeolocationBlockerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

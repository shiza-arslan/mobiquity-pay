import { TestBed } from '@angular/core/testing';

import { PreLoginService } from './pre-login.service';

describe('PreLoginService', () => {
  let service: PreLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

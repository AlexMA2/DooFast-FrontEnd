import { TestBed } from '@angular/core/testing';

import { IsLogGuard } from './is-log.guard';

describe('IsLogGuard', () => {
  let guard: IsLogGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsLogGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

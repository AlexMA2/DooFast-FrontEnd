import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard.guard';

describe('AuthGuardGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });
});

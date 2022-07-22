import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { asyncData } from '../asyncData';
import { User } from 'src/app/models/User';

describe('AuthService', () => {
  let service: AuthService;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new AuthService(httpClientSpy);
  });
});

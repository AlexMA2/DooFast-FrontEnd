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

  it('should return expected response (HttpClient called once)', (done: DoneFn) => {
    const expectedResponse: User[] = [
      {
        role: 'Administrador',
        username: 'Alex Mamani',
      },
    ];

    httpClientSpy.get.and.returnValue(asyncData(expectedResponse));

    service.login('mamani.alex1@doofast.com', '1234567890').subscribe({
      next: (res) => {
        expect(res).withContext('expected response').toEqual(expectedResponse);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});

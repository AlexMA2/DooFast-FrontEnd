import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../BASE_URL';
import { BehaviorSubject } from 'rxjs';

const API_URL = BASE_URL + 'api/Auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRole: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(API_URL, {
      correo: email,
      contrasenia: password,
    });
  }

  set setUserRole(role: string) {
    this.userRole.next(role);
  }

  get getUserRole() {
    return this.userRole.asObservable();
  }
}

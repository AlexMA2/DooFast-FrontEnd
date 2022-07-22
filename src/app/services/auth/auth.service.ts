import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../BASE_URL';
import { BehaviorSubject } from 'rxjs';
import { User, UserLogin } from 'src/app/models/User';

const API_URL = BASE_URL + 'api/Auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<User> = new BehaviorSubject<User>({
    role: '',
    username: '',
  });

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<UserLogin>(API_URL, {
      correo: email,
      contrasenia: password,
    });
  }

  set setUser(user: User) {
    this.user.next(user);
  }

  get getUser() {
    return this.user.asObservable();
  }
}

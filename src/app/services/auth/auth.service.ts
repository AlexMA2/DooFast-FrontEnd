import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post('https://0a2c-190-237-151-210.sa.ngrok.io/api/Auth', {
      correo: email,
      contrasenia: password,
    });
  }
}

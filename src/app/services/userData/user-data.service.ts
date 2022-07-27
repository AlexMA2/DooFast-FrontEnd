import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/models/UserData';
import { BASE_URL } from '../BASE_URL';
import { handleError } from '../handleError';

import { catchError } from 'rxjs/operators';

const API_URL = BASE_URL + 'api/Usuarios';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(API_URL).pipe(catchError(handleError));
  }

  addUser(usuario: string, nombreUsuario: string, contrasenia: string, nroCelular: string,
    correoElectronico: string, idRestaurante: number, idRol: number): Observable<any> {
    return this.http
      .post<any>(API_URL, { usuario, nombreUsuario, contrasenia, nroCelular, correoElectronico,
      idRestaurante, idRol })
      .pipe(catchError(handleError));
  }

  deleteUser(idUsuario: number) {
    return this.http
      .delete(`${API_URL}/${idUsuario}`)
      .pipe(catchError(handleError));
  }
}

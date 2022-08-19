import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/models/UserData';
import { BASE_URL } from '../BASE_URL';
import { handleError } from '../handleError';

import { catchError } from 'rxjs/operators';
import { UpdateUser } from 'src/app/models/User';

const API_URL = BASE_URL + 'api/Usuarios';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  getUser(idUsuario: number): Observable<UserData> {
    return this.http
      .get<UserData>(`${API_URL}/${idUsuario}`)
      .pipe(catchError(handleError));
  }

  getAllUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(API_URL).pipe(catchError(handleError));
  }

  addUser(updateUser: UpdateUser): Observable<any> {
    return this.http
      .post<any>(API_URL, { ...updateUser })
      .pipe(catchError(handleError));
  }

  deleteUser(idUsuario: number) {
    return this.http
      .delete(`${API_URL}/${idUsuario}`)
      .pipe(catchError(handleError));
  }

  updateUser(idUsuario: number, updateUser: UpdateUser): Observable<any> {
    return this.http
      .put<any>(`${API_URL}/${idUsuario}`, { idUsuario, ...updateUser })
      .pipe(catchError(handleError));
  }
}

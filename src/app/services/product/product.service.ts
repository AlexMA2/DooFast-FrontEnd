import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { BASE_URL } from '../BASE_URL';
import { handleError } from '../handleError';

import { catchError } from 'rxjs/operators';

const API_URL = BASE_URL + 'api/ComidaCarta';
const API_URL_FOOD = BASE_URL + 'api/Comidas';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL).pipe(catchError(handleError));
  }

  getAllFood(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL_FOOD).pipe(catchError(handleError));
  }

  addFoodToMenu(idComida: number): Observable<Product> {
    return this.http
      .post<Product>(API_URL, { idCarta: 1, idComida })
      .pipe(catchError(handleError));
  }

  addFood(nombreComida: string,
  precio: number,
  costo: number,
  idCategoria: number, imagen: File): Observable<any> {
    console.log(nombreComida, precio, costo, idCategoria, imagen);
    const headers = new HttpHeaders({ 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' })
    return this.http
      .post<any>(API_URL_FOOD, { nombreComida, precio, costo, idCategoria, imagen }, { headers })
      .pipe(catchError(handleError));
  }

  deleteFoodFromMenu(idComida: number) {
    return this.http
      .delete(`${API_URL}/${idComida}`)
      .pipe(catchError(handleError));
  }

  deleteFood(idComida: number) {
    return this.http
      .delete(`${API_URL_FOOD}/${idComida}`)
      .pipe(catchError(handleError));
  }
}

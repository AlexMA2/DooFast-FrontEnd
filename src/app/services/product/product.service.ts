import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getAllFood(): Observable<any[]> {
    return this.http.get<any[]>(API_URL_FOOD).pipe(catchError(handleError));
  }

  addFoodToMenu(idComida: number): Observable<Product> {
    return this.http
      .post<Product>(API_URL, { idCarta: 1, idComida })
      .pipe(catchError(handleError));
  }

  deleteFoodFromMenu(idComida: number) {
    return this.http
      .delete(`${API_URL}/${idComida}`)
      .pipe(catchError(handleError));
  }

  addProduct(data: FormData): Observable<Product> {
    return this.http
      .post<Product>(API_URL_FOOD, data)
      .pipe(catchError(handleError));
  }

  editProduct(data: FormData): Observable<Product> {
    return this.http
      .put<Product>(API_URL_FOOD, data)
      .pipe(catchError(handleError));
  }

  deleteProduct(idProducto: number): Observable<Product> {
    return this.http
      .delete<Product>(`${API_URL_FOOD}/${idProducto}`)
      .pipe(catchError(handleError));
  }
}

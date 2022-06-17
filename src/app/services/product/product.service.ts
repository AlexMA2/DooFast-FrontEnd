import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { BASE_URL } from '../BASE_URL';
import { handleError } from '../handleError';

import { catchError } from 'rxjs/operators';

const API_URL = BASE_URL + 'api/Carta';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL).pipe(catchError(handleError));
  }
}

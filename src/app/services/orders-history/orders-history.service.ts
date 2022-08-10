import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../BASE_URL';
import { handleError } from '../handleError';
import { catchError } from 'rxjs/operators';
import { TopProduct } from 'src/app/models/TopProduct';

const API_URL = BASE_URL + 'api/history';

@Injectable({
  providedIn: 'root',
})
export class OrdersHistoryService {
  constructor(private http: HttpClient) {}

  getIncomeForYear(year: number): Observable<any> {
    return this.http
      .get<any>(`${API_URL}/year/${year}`)
      .pipe(catchError(handleError));
  }

  getOrdersForYear(year: number): Observable<any> {
    return this.http
      .get<any>(`${API_URL}/year/${year}`)
      .pipe(catchError(handleError));
  }

  getDataForYear(year: number): Observable<any> {
    return this.http
      .get<any>(`${API_URL}/year/${year}`)
      .pipe(catchError(handleError));
  }

  getDataForMonth(month: number): Observable<any> {
    return this.http
      .get<any>(`${API_URL}/month/${month}`)
      .pipe(catchError(handleError));
  }

  getHistoryProducts(): Observable<TopProduct[][]> {
    return this.http
      .get<any>(`${API_URL}/products`)
      .pipe(catchError(handleError));
  }
}

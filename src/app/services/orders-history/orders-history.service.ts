import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../BASE_URL';
import { handleError } from '../handleError';
import { catchError } from 'rxjs/operators';
import { TopProduct } from 'src/app/models/TopProduct';
import { EconomicData } from 'src/app/models/EconomicData';

const API_URL = BASE_URL + 'api/Balance';

@Injectable({
  providedIn: 'root',
})
export class OrdersHistoryService {
  constructor(private http: HttpClient) {}

  getDataForYear(year: number): Observable<EconomicData[]> {
    return this.http
      .get<EconomicData[]>(`${API_URL}?anio=${year}`)
      .pipe(catchError(handleError));
  }

  getDataForMonth(month: number): Observable<any> {
    return this.http
      .get<any>(`${API_URL}?mes=${month}`)
      .pipe(catchError(handleError));
  }

  getHistoryProducts(): Observable<TopProduct[][]> {
    return this.http
      .get<any>(`${API_URL}/products`)
      .pipe(catchError(handleError));
  }
}

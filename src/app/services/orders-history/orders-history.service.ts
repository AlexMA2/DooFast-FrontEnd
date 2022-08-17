import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../BASE_URL';
import { handleError } from '../handleError';
import { catchError } from 'rxjs/operators';
import { EconomicData } from 'src/app/models/EconomicData';
import { HistoryProduct } from 'src/app/models/HistoryProduct';

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

  getHistoryProducts(): Observable<HistoryProduct[][]> {
    return this.http
      .get<any>(`${BASE_URL}/api/Historial`)
      .pipe(catchError(handleError));
  }
}

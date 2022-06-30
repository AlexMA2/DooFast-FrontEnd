import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderData } from 'src/app/models/Order';
import { BASE_URL } from '../BASE_URL';
import { handleError } from '../handleError';
import { catchError } from 'rxjs/operators';

// Change LOCAL_URL to BASE_URL to use the server
const API_URL = BASE_URL + 'api/Ordenes';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  addOrder(order: Order) {
    return this.http.post<string>(API_URL, order);
  }

  getAllOrders(): Observable<OrderData[]> {
    return this.http.get<OrderData[]>(API_URL).pipe(catchError(handleError));
  }

  getOrderByTableNumber(tableNumber: number): Observable<OrderData[]> {
    return this.http.get<OrderData[]>(`${API_URL}/${tableNumber}`);
  }

  deleteOrder(id: number): Observable<OrderData> {
    return this.http.delete<OrderData>(`${API_URL}/${id}`);
  }
}

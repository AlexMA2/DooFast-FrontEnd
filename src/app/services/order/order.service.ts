import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { BASE_URL } from '../BASE_URL';

const API_URL = BASE_URL + 'api/Pedido';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  addOrder(order: Order): Observable<Order> {
    console.log(API_URL);
    return this.http.post<Order>(API_URL, order);
  }
}

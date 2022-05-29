import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';

const baseUrl = 'https://21d2-190-237-151-210.sa.ngrok.io/api/Menu';

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl);
  }  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from 'src/app/models/Table';
import { BASE_URL } from '../BASE_URL';

const API_URL = BASE_URL + 'api/Mesa';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private http: HttpClient) {}

  getAllTables(): Observable<Table[]> {
    return this.http.get<Table[]>(API_URL);
  }

  getTableByNumber(tableNumber: number): Observable<Table> {
    return this.http.get<Table>(`${API_URL}/${tableNumber}`);
  }

  addTable(table: Table): Observable<Table> {
    return this.http.post<Table>(API_URL, table);
  }

  deleteTable(tableNumber: number): Observable<Table> {
    return this.http.delete<Table>(`${API_URL}/${tableNumber}`);
  }
}

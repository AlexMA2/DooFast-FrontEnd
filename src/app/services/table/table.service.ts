import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostTable, PutTable, Table } from 'src/app/models/Table';
import { handleError } from '../handleError';
import { catchError } from 'rxjs/operators';
import { BASE_URL } from '../BASE_URL';

const API_URL = BASE_URL + 'api/Mesa';

const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
}
const requestOptions = {                                                                                                                                                                                 
  headers: new HttpHeaders(headerDict), 
};

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private http: HttpClient) {}

  getAllTables(): Observable<Table[]> {
    return this.http.get<Table[]>(API_URL, requestOptions).pipe(catchError(handleError));
  }

  addTable(table: PostTable): Observable<PostTable> {
    return this.http.post<PostTable>(API_URL, table);
  }

  deleteTable(tableNumber: number): Observable<Table> {
    return this.http.delete<Table>(`${API_URL}/${tableNumber}`);
  }

  updateTable(table: PutTable): Observable<PutTable> {
    return this.http.put<PutTable>(`${API_URL}`, table);
  }
}

import { Injectable } from '@angular/core';
import { BASE_URL } from '../BASE_URL';

const API_URL = BASE_URL + 'api/Mesa';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }
}

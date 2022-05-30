import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private tableId: number = -1;
  private order = {
    starters : [],
    mainDishes : [],
    drinks : [],
    desserts : []
  }

  constructor(
      
  ) { }

  setTableId(tableId: number) {
    this.tableId = tableId;
  }

  getOrder() {
    if (this.tableId !== -1) {
      return this.order;
    }
    return null;
  }

}

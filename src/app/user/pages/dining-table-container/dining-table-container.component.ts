import { Component } from '@angular/core';
import { OrderData } from 'src/app/models/Order';
import { Table } from 'src/app/models/Table';
import { OrderService } from 'src/app/services/order/order.service';
import { TableService } from 'src/app/services/table/table.service';
import { orders } from '../../constants/orders-fake';

@Component({
  selector: 'app-dining-table-container',
  templateUrl: './dining-table-container.component.html',
  styleUrls: ['./dining-table-container.component.css'],
})
export class DiningTableContainerComponent {
  diningTableAmount: number = 10;
  date: Date = new Date();

  interval = setInterval(() => {
    this.date = new Date();
  }, 1000);

  pendingOrders!: OrderData[];
  numberPendingOrders: number = 0;
  tables: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

  constructor(
    private orderService: OrderService,
    private tablesServices: TableService
  ) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      (data) => {
        this.pendingOrders = data;
        this.numberPendingOrders = data.length;
        for (let order in data) {
          this.tables[data[order].idMesa] = 1;
        }
      },
      (error) => {
        this.pendingOrders = orders;
        this.numberPendingOrders = orders.length;
      }
    );
  }

  getAllTables(): void {
    this.tablesServices.getAllTables().subscribe((data) => {
      return data;
    });
  }
}

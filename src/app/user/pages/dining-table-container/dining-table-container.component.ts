import { Component } from '@angular/core';
import { OrderData } from 'src/app/models/Order';
import { Table } from 'src/app/models/Table';
import { TableService } from 'src/app/services/table/table.service';
import { TablesFake } from '../../constants/tables-fake';

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

  tables!: Table[];

  constructor(private tablesServices: TableService) {}

  ngOnInit(): void {
    this.getAllTables();
  }

  getAllTables(): void {
    this.tablesServices.getAllTables().subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].nroMesa = i + 1;
        }
        this.tables = data;
      },
      () => {
        this.tables = TablesFake;
      }
    );
  }
}

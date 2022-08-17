import { Component, Input, OnInit } from '@angular/core';
import { TableState } from '../../constants/dining-table-states';
import { Router } from '@angular/router';
import { PutTable, Table } from 'src/app/models/Table';
import { TableService } from 'src/app/services/table/table.service';

@Component({
  selector: 'app-dining-table',
  templateUrl: './dining-table.component.html',
  styleUrls: ['./dining-table.component.css'],
})
export class DiningTableComponent implements OnInit {
  @Input() table!: Table;
  time: number = 0;

  isOrderShowed: boolean = false;
  display: string = '00m 00s ';
  interval: any;
  putTable!: PutTable;
  constructor(private router: Router, private tableService: TableService) {}

  TableState = TableState;
  showOrderButtonText: string = 'Mostrar pedido';
  date: Date = new Date();

  ngOnInit(): void {
    if (this.table.estadoMesa === TableState.Waiting) {
      this.startTimer();
    }
    // Asigna un objeto para actualizar el estado de la mesa en la BD
    this.putTable = {
      estadoMesa: this.table.estadoMesa,
      nroMesa: this.table.nroMesa,
      IdRestaurante: this.table.nroMesa,
    };
  }

  toggleTableState(state: TableState) {
    // Cambia estado local de la mesa
    this.putTable.estadoMesa = state;
    // Cambia estado de la mesa en la BD
    this.tableService.updateTable(this.putTable).subscribe((data) => {
      console.log(data);
    });
    this.table.estadoMesa = state;
  }

  startTimer() {
    this.interval = setInterval(() => {
      let date = new Date();
      this.display = date.getMinutes() + 'm ' + date.getSeconds() + 's';
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  orderServed() {
    this.toggleTableState(TableState.Served);
    this.pauseTimer();
    this.isOrderShowed = false;
  }

  payOrder() {
    this.router.navigate(['waitress/record-payment', this.table.nroMesa]);

    this.pauseTimer();
  }

  toggleOrder(orderDeleted: boolean) {
    if (this.isOrderShowed) {
      this.isOrderShowed = false;
      this.showOrderButtonText = 'Mostrar pedido';
    } else {
      this.isOrderShowed = true;
      this.showOrderButtonText = 'Ocultar pedido';
    }

    if (orderDeleted) {
      this.isOrderShowed = false;
      this.table.estadoMesa = TableState.Empty;
    }
  }
}

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

  seconds = 0;
  minutes = 0;

  isOrderShowed: boolean = false;
  display: string = '00m 00s ';
  interval: any;
  putTable!: PutTable;

  timeWaitingStart!: Date;

  constructor(private router: Router, private tableService: TableService) {}

  TableState = TableState;
  showOrderButtonText: string = 'Mostrar pedido';
  date: Date = new Date();

  ngOnInit(): void {
    console.log(this.table.estadoMesa);
    if (this.table.estadoMesa === TableState.Waiting) {
      this.startTimer();
    }

    if (
      this.table.estadoMesa === TableState.Served ||
      this.table.estadoMesa === TableState.Empty
    ) {
      this.stopTimer();
    }
    // Asigna un objeto para actualizar el estado de la mesa en la BD
    this.putTable = {
      estadoMesa: this.table.estadoMesa,
      idMesa: this.table.nroMesa,
      nroAsientos: 10,
    };

    let timeWaitingArray: Array<number> = JSON.parse(
      localStorage.getItem('timeWaiting' + this.table.nroMesa) || '[]'
    );

    if (timeWaitingArray.length === 2) {
      this.minutes = timeWaitingArray[0];
      this.seconds = timeWaitingArray[1];
    }
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
      this.display = this.minutes + 'm' + this.seconds + 's';
      this.seconds += 1;
      if (this.seconds >= 60) {
        this.minutes += 1;
        this.seconds = 0;
      }

      localStorage.setItem(
        'timeWaiting' + this.table.nroMesa,
        JSON.stringify([this.minutes, this.seconds])
      );
    }, 1000);
  }

  stopTimer() {
    this.interval = null;
    this.display = '00m 00s ';
    this.seconds = 0;
    this.minutes = 0;
    localStorage.removeItem('timeWaiting' + this.table.nroMesa);
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

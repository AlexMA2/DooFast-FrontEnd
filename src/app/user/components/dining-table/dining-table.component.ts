import { Component, Input, OnInit } from '@angular/core';
import { TableState } from '../../constants/dining-table-states';
import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';
import { Table } from 'src/app/models/Table';

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
  constructor(private router: Router) {}

  TableState = TableState;
  showOrderButtonText: string = 'Mostrar pedido';
  date: Date = new Date();

  ngOnInit(): void {
    if (this.table.estadoMesa === TableState.Waiting) {
      this.startTimer();
    }
  }

  groupArrayOfObjects(lista: any[], key: any) {
    return lista.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
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
    this.pauseTimer();
    this.isOrderShowed = false;
  }

  payOrder() {
    this.router.navigate(['waitress/record-payment', this.table.nroMesa]);
    console.log('Go to the page with the amount and details to pay');
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

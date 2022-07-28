import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableState } from '../../constants/dining-table-states';
import Swal from 'sweetalert2';
import { Table } from 'src/app/models/Table';

interface Order {
  id: number;
  table: number;
  starter: string;
  maindish: string;
  dessert: string;
  drink: string;
}

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

  TableState = TableState;
  showOrderButtonText: string = 'Mostrar pedido';
  date: Date = new Date();

  ngOnInit(): void {
    if (this.table.estadoMesa === TableState.Waiting) {
      this.startTimer();
    }
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
  }

  cancelOrder() {
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
      console.log(this.table.estadoMesa);
    }
  }

  payOrder() {
    console.log('Go to the page with the amount and details to pay');
  }
}

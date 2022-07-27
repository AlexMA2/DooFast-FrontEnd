import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EMPTY, WAITING, SERVED } from '../../constants/dining-table-states';
import Swal from 'sweetalert2';
import { OrderData } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-dining-table',
  templateUrl: './dining-table.component.html',
  styleUrls: ['./dining-table.component.css'],
})
export class DiningTableComponent {
  // Angular cannot use the imported constants from constants.ts in HTML
  EMPTY = EMPTY;
  WAITING = WAITING;
  SERVED = SERVED;
  @Input() tableNumber!: number;
  @Input() tableState!: number; // 0=EMPTY, 1=WAITING, 2=SERVED
  @Input() orders: OrderData[] = [];
  // @Output() changeTableState = new EventEmitter<any>();
  state: string = WAITING;
  time: number = 0;
  grupos: any[][] = [];
  isOrderShowed: boolean = false;
  showHideText: String = 'Mostrar Orden';

  display: string = '00m 00s ';
  interval: any;

  constructor(private orderService: OrderService) { }

  ngOnChanges(): void {
    console.log("Mi estado es: " + this.tableState);
    switch (this.tableState) {
      case 0:
        this.state = EMPTY;
        break;
      case 1:
        this.state = WAITING;
        this.startTimer();
        break;
      case 2:
        this.state = SERVED;
        this.pauseTimer();
        break;
      default:
        this.state = EMPTY;
        break;
    }
    if (this.orders.length > 0) {
      // create array with all orders to the table
      //   this.orders.forEach(order => {
      // }
      console.log(this.state);
    }
  }

  groupArrayOfObjects(lista: any[], key: any) {
    return lista.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  startTimer() {
    this.interval = setInterval(() => {
      this.time++;
      this.display = this.transform(this.time);
    }, 1000);
  }
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + 'm ' + (value - minutes * 60) + 's';
  }
  pauseTimer() {
    clearInterval(this.interval);
  }

  takeOrder() {
    this.state = WAITING;
    this.startTimer();
  }

  orderServed() {
    this.state = SERVED;
    this.pauseTimer();
  }

  cancelOrder() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        //Delete all orders
        this.orders.forEach(order => {
          this.orderService.deleteOrder(order.idOrden!).subscribe(() => {
            console.log("Order deleted");
          }
          );
        });
        if(this.isOrderShowed) {
          this.showHideText = 'Mostrar Orden';
          this.isOrderShowed = false;
        }
        this.state = EMPTY;
        Swal.fire(
          '¡Eliminado!',
          'Your file has been deleted.',
          'success'
        );
      }
    })
  }

  showOrder() {
    this.grupos = this.groupArrayOfObjects(this.orders, 'idComida');
    console.log(this.grupos);
    this.showHideText = this.isOrderShowed ? 'Mostrar Orden' : 'Ocultar Orden';
    console.log('Dropdown a modal with the order to edit or cancel');
    this.isOrderShowed = !this.isOrderShowed;
    if (this.orders.length > 0) {
      for (let order in this.orders) {
        console.log(order);
      }
    } else {
      console.log("vacio");
    }
  }

  payOrder() {
    console.log('Go to the page with the amount and details to pay');
  }
}

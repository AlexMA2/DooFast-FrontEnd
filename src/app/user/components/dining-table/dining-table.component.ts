import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EMPTY, WAITING, SERVED } from '../../constants/dining-table-states';
import Swal from 'sweetalert2';

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
export class DiningTableComponent {
  // Angular cannot use the imported constants from constants.ts in HTML
  EMPTY = EMPTY;
  WAITING = WAITING;
  SERVED = SERVED;
  @Input() tableNumber!: number;
  @Output() changeTableState = new EventEmitter<any>();
  state: string = WAITING;
  time: number = 0;
  orders?: Order[] = [];
  isOrderShowed: boolean = false;

  display: string = '00m 00s ';
  interval: any;

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
        Swal.fire(
          '¡Eliminado!',
          'Your file has been deleted.',
          'success'
        )
        if (this.isOrderShowed) {
          this.isOrderShowed = !this.isOrderShowed;
        }
        this.state = EMPTY;
      }
    })
    this.state = WAITING;
    this.pauseTimer();
  }

  showOrder() {
    console.log('Dropdown a modal with the order to edit or cancel');
    this.isOrderShowed = !this.isOrderShowed;
  }

  payOrder() {
    console.log('Go to the page with the amount and details to pay');
  }
}

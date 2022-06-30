import { Component, Input } from '@angular/core';
import { EMPTY, WAITING, SERVED } from '../../constants/dining-table-states';

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
  state: string = EMPTY;
  time: number = 0;
  orders?: Order[] = [];

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

  showOrder() {
    console.log('Dropdown a modal with the order to edit or cancel');
  }

  payOrder() {
    console.log('Go to the page with the amount and details to pay');
  }
}

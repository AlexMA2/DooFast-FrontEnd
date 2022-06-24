import { Component, EventEmitter, Input, Output } from '@angular/core';

import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { OrderData } from 'src/app/models/Order';


@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.css']
})
export class PendingOrderComponent{

  @Input() order!: OrderData;
  @Input() index!: number;
  
  faCoffee = faCoffee;
  time: number = 0;
  DisplayedTime: string = '00m 00s ';

  @Output() removed = new EventEmitter<number>();

  startTimer() {
    setInterval(() => {
      if (this.time > 10000) {
        this.time = this.time%10000;
      }
      this.time++;
      this.DisplayedTime = this.transform(this.time);
    }, 1000);
  }

  removeOrder() {
    console.log("removing order" + this.order.idOrden);
    this.removed.emit(this.order.idOrden!);
  }
  

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + 'm ' + (value - minutes * 60) + 's';
  }

  // Convert String date to seconds
  dateStringToSeconds(date: string): number {
    date = date.substring(date.length - 8);
    const timeArray = date.split(':');
    const seconds = parseInt(timeArray[0]) * 3600 + parseInt(timeArray[1]) * 60 + parseInt(timeArray[2]);
    return seconds;
  }

  constructor() {
    this.startTimer();
  }

  ngOnInit(): void {
    console.log(this.order);
    var startDate = new Date();
    console.log("Hora actual " + this.dateStringToSeconds(startDate.toLocaleString()));
    console.log("The time is " + this.dateStringToSeconds(this.order.fechaCreacion!));
    this.time = this.dateStringToSeconds(startDate.toLocaleString()) - this.dateStringToSeconds(this.order.fechaCreacion!.toLocaleString());
  }

}

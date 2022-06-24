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
  
  faCoffee = faCoffee;
  time: number = 0;
  DisplayedTime: string = '00m 00s ';

  @Output() removed = new EventEmitter<number>();

  startTimer() {
    setInterval(() => {
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

  constructor() {
    console.log(this.order);
    this.startTimer();
  }

  ngOnInit(): void {
    console.log(this.order);
  }

}

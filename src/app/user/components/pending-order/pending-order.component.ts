import { Component, EventEmitter, Input, Output } from '@angular/core';

import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { OrderData } from 'src/app/models/Order';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.css'],
})
export class PendingOrderComponent {
  @Input() order!: OrderData;
  @Input() index!: number;

  faCoffee = faCoffee;
  time: number = 0;
  DisplayedTime: string = '00m 00s ';

  @Output() removed = new EventEmitter<number>();

  startTimer() {
    setInterval(() => {
      if (this.time > 3600) {
        this.removeOrder();
      }
      this.time++;
      this.DisplayedTime = this.transform(this.time);
    }, 1000);
  }

  removeOrder() {
    this.removed.emit(this.order.idOrden!);
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + 'm ' + (value - minutes * 60) + 's';
  }

  ngOnInit(): void {
    var startDate = new Date();
    var endDate = new Date(this.order.fechaCreacion);

    const minutes = startDate.getMinutes() - endDate.getMinutes();
    const seconds = startDate.getSeconds() - endDate.getSeconds();

    this.time = minutes * 60 + seconds;

    this.DisplayedTime = this.transform(this.time);
    this.startTimer();
  }
}

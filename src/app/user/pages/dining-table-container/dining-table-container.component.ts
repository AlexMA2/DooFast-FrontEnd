import { Component } from '@angular/core';

@Component({
  selector: 'app-dining-table-container',
  templateUrl: './dining-table-container.component.html',
  styleUrls: ['./dining-table-container.component.css'],
})
export class DiningTableContainerComponent {
  diningTableAmount: number = 10;
  date: Date = new Date();

  interval = setInterval(() => {
    this.date = new Date();
  }, 1000);
}

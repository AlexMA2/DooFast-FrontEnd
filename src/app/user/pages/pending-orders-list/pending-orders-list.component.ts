import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { OrderData } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order/order.service';
import { orders } from '../../constants/orders-fake';

@Component({
  selector: 'app-pending-orders-list',
  templateUrl: './pending-orders-list.component.html',
  styleUrls: ['./pending-orders-list.component.css']
})
export class PendingOrdersListComponent implements OnInit {

  isServerOn!: boolean | null;
  pendingOrders!: OrderData[];
  numberPendingOrders: number = 0;

  constructor(
    private orderService: OrderService) {
    // this.pendingOrders = JSON.parse(JSON.stringify(orders));
  }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      (data) => {
        console.log(data);
        this.pendingOrders = data,
        this.isServerOn = true;
        this.numberPendingOrders = data.length;
      },
      (error) => {
        console.log(error);
        this.isServerOn = false;
        this.pendingOrders = orders;
        this.numberPendingOrders = orders.length;
      }
    );
    // for (let i = 0; i < this.pendingOrders.length; i++) {
    //   timer(1000).subscribe(x => { console.log(i); })
    // }
  }

  removeOrder(idOrder: number) {
    this.pendingOrders = this.pendingOrders.filter(o => o.idOrden !== idOrder);
    this.numberPendingOrders--;
  }
}

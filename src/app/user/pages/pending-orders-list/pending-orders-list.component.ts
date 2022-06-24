import { Component, OnInit } from '@angular/core';
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
          this.pendingOrders = data,
          this.isServerOn = true;
        },
        (error) => {
          console.log(error);
          this.isServerOn = false;
          this.pendingOrders = orders;
        }
      );
  }

  removeOrder(idOrder: number) {
    this.pendingOrders = this.pendingOrders.filter(o => o.idOrden !== idOrder);
    this.numberPendingOrders--;
  }
}

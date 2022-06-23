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

  isServerOn: boolean = false;
  pendingOrders: OrderData[];


  constructor(
    private orderService: OrderService) {
    this.pendingOrders = JSON.parse(JSON.stringify(orders));
  }

  ngOnInit(): void {
    this.isServerOn = true;
    this.orderService.getAllOrders();
    print();
  }

}

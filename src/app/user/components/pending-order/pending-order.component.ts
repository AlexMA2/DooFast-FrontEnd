import { Component, OnInit } from '@angular/core';
import {orders} from '../../constants/orders-fake';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.css']
})
export class PendingOrderComponent implements OnInit {

  orders = orders;
  faCoffee = faCoffee;

  constructor() { }

  ngOnInit(): void {
  }

}

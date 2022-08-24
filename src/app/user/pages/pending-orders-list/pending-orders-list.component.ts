import { Component, OnInit } from '@angular/core';
import { OrderData } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order/order.service';
import { orders } from '../../constants/orders-fake';

import { MatSnackBar } from '@angular/material/snack-bar';
import { TableState } from '../../constants/dining-table-states';
import { OrderState } from '../../constants/order-states';

@Component({
  selector: 'app-pending-orders-list',
  templateUrl: './pending-orders-list.component.html',
  styleUrls: ['./pending-orders-list.component.css'],
})
export class PendingOrdersListComponent implements OnInit {
  isServerOn!: boolean | null;
  pendingOrders: OrderData[] = [];
  numberPendingOrders: number = 0;
  timeout: any;
  duration: number = 2000;

  ordenRemoved?: OrderData | null;
  indexOrdenRemoved: number = 0;

  constructor(
    private orderService: OrderService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      (data) => {
        this.pendingOrders = data.filter(
          (o) => o.estadoOrden === OrderState.toServe
        );
        console.log(this.pendingOrders);
        this.isServerOn = true;
        this.numberPendingOrders = this.pendingOrders.length;
      },
      (error) => {
        this.isServerOn = false;

        this.pendingOrders = orders;
        this.numberPendingOrders = orders.length;
      }
    );
  }

  openSnackBar() {
    let snackBar = this._snackBar.open('Orden eliminada', 'Deshacer', {
      duration: this.duration,
    });

    snackBar.onAction().subscribe(() => {
      clearTimeout(this.timeout);
      if (this.ordenRemoved) {
        this.pendingOrders.splice(this.indexOrdenRemoved, 0, this.ordenRemoved);
      }

      this.numberPendingOrders++;
    });
  }

  removeOrder(idOrder: number) {
    this.openSnackBar();
    this.ordenRemoved = this.pendingOrders.find((o, index) => {
      this.indexOrdenRemoved = index;
      return o.idOrden === idOrder;
    });

    this.pendingOrders = this.pendingOrders.filter((o) => {
      console.log(o, idOrder);
      return o.idOrden !== idOrder;
    });

    this.timeout = setTimeout(() => {
      this.orderService
        .updateOrder({ idOrden: idOrder, estadoOrden: OrderState.toPay })
        .subscribe((data) => console.log(data));
    }, this.duration + 100);

    this.numberPendingOrders--;
  }
}

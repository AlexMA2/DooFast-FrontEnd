import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { OrderData } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { Table } from 'src/app/models/Table';
import { OrderService } from 'src/app/services/order/order.service';
import Swal from 'sweetalert2';
import { loadOrders } from '../../utils/getOrdersFromDatabase';
import { orders } from '../../constants/orders-fake';

@Component({
  selector: 'app-summary-order',
  templateUrl: './summary-order.component.html',
  styleUrls: ['./summary-order.component.css'],
})
export class SummaryOrderComponent implements OnInit {
  @Input() table!: Table;
  @Output() hideOrderEv = new EventEmitter<boolean>();

  ordersList: any = {
    Entrada: [] as Product[],
    Principal: [] as Product[],
    Bebida: [] as Product[],
    Postre: [] as Product[],
  };

  constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrderByTableNumber(this.table.idMesa).subscribe(
      (data) => {
        this.ordersList = loadOrders(data);
      },
      () => {
        this.ordersList = loadOrders(orders);
        console.log(this.ordersList);
      }
    );
  }

  hideOrder() {
    this.hideOrderEv.emit(false);
  }

  editOrder() {
    this.router.navigate(['/waitress/take-order/', this.table.nroMesa]);
  }

  cancelOrder() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!',
      cancelButtonText: 'No, dejalo',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Eliminado!', 'Se ha eliminado la orden', 'success');
        this.orderService
          .deleteOrder(this.table.idMesa)
          .subscribe((data) => {})
          .unsubscribe();
      }
      this.hideOrderEv.emit(true);
    });
  }

  ngOnDestroy(): void {
    this.hideOrderEv.unsubscribe();
  }
}

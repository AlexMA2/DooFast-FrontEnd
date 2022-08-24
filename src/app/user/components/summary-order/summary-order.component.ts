import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { PutTable, Table } from 'src/app/models/Table';
import { OrderService } from 'src/app/services/order/order.service';
import Swal from 'sweetalert2';
import { loadOrders } from '../../utils/getOrdersFromDatabase';
import { orders } from '../../constants/orders-fake';
import { TableService } from 'src/app/services/table/table.service';
import { TableState } from '../../constants/dining-table-states';

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

  ordersShowed: any = {
    Entrada: [] as OrderShowed[],
    Principal: [] as OrderShowed[],
    Bebida: [] as OrderShowed[],
    Postre: [] as OrderShowed[],
  };

  idsOrders: Array<number> = [];

  putTable!: PutTable;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.orderService.getOrderByTableNumber(this.table.idMesa).subscribe(
      (data) => {
        this.ordersList = loadOrders(data);
      },
      () => {
        this.ordersList = loadOrders(orders);
      }
    );
    this.putTable = {
      estadoMesa: TableState.Empty,
      idMesa: this.table.idMesa,
      nroAsientos: 10,
    };
  }

  fillOrdersShowed() {
    for (let category in this.ordersList) {
      for (let order of this.ordersList[category]) {
        this.ordersShowed[category].push({
          product: order,
          quantity: order.cantidad,
          price: order.precio,
        });
      }
    }
  }

  hideOrder() {
    this.hideOrderEv.emit(false);
  }

  editOrder() {
    this.router.navigate(['/waitress/take-order/', this.table.idMesa]);
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
        this.orderService
          .deleteAllOrders(this.table.idMesa)
          .subscribe((data) => {
            Swal.fire('¡Eliminado!', data, 'success');
          });
        this.tableService.updateTable(this.putTable).subscribe((data) => {
          console.log(data);
        });
        this.hideOrderEv.emit(true);
      }
    });
  }

  ngOnDestroy(): void {
    this.hideOrderEv.unsubscribe();
  }
}

export interface OrderShowed {
  name: string;
  quantity: number;
  totalPrice: number;
}

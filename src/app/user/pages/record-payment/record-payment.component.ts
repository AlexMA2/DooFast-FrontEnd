import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderData, PutOrder } from 'src/app/models/Order';
import { PutTable } from 'src/app/models/Table';
import { OrderService } from 'src/app/services/order/order.service';
import { TableService } from 'src/app/services/table/table.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-record-payment',
  templateUrl: './record-payment.component.html',
  styleUrls: ['./record-payment.component.css'],
})
export class RecordPaymentComponent implements OnInit {
  sub!: any;
  id!: string;
  orders?: OrderData[];
  putOrders: PutOrder[] = [];
  putTable!: PutTable;
  totalPrice: number = 0;
  paymentMethod: string = 'Efectivo';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.orderService.getOrderByTableNumber(Number(this.id)).subscribe(
      (data) => {
        this.orders = data;

        for (let i = 0; i < this.orders.length; i++) {
          this.totalPrice += this.orders[i].precio!;
          this.putOrders.push({
            idOrden: this.orders![i].idOrden!,
            nroMesa: this.orders![i].idMesa,
            estadoOrden: 'Pagado',
          });
        }

        this.putTable = {
          estadoMesa: 'Libre',
          nroMesa: Number(this.id),
          IdRestaurante: 1,
        };
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatDecimal(value: number) {
    return value.toFixed(2);
  }

  changePaymentMethod(toEfectivo: boolean) {
    if (toEfectivo) {
      this.paymentMethod = 'efectivo';
    } else {
      this.paymentMethod = 'tarjeta';
    }
  }

  pagar() {
    Swal.fire({
      title: 'Confirmar pago',
      text: `Pago de S/${this.formatDecimal(this.totalPrice)} con ${
        this.paymentMethod
      } `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Confirmar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tableService.getAllTables().subscribe(
          (data) => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡Ocurrió un error!',
              footer: error,
            });
          }
        );
      }
    });
  }
}

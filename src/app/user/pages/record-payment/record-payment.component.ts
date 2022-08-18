import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderData, PutOrder } from 'src/app/models/Order';
import { PutTable } from 'src/app/models/Table';
import { OrderService } from 'src/app/services/order/order.service';
import { TableService } from 'src/app/services/table/table.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { TableState } from '../../constants/dining-table-states';

@Component({
  selector: 'app-record-payment',
  templateUrl: './record-payment.component.html',
  styleUrls: ['./record-payment.component.css'],
})
export class RecordPaymentComponent implements OnInit {
  sub!: any;
  id!: string;
  orders?: OrderData[];
  putOrders: PutOrder[] = []; // En caso de que se quiera actualizar el estado de las órdenes en lugar de eliminarlas
  putTable!: PutTable;
  totalPrice: number = 0;
  paymentMethod: string = 'Efectivo';

  constructor(
    private _location: Location,
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
            idOrden: this.orders[i].idOrden!,
            nroMesa: this.orders[i].idMesa,
            estadoOrden: 'Pagado',
          });
        }

        this.putTable = {
          estadoMesa: TableState.Empty,
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
        // Eliminar las órdenes de la mesa
        if (this.orders) {
          for (let i = 0; i < this.orders.length; i++) {
            console.log(this.putOrders[i]);
            this.orderService
              .deleteOrder(this.orders[i].idOrden!)
              .subscribe((data) => {
                console.log(data);
              });
          }
        }
        // Actualizar el estado de la mesa
        this.tableService.updateTable(this.putTable).subscribe((data) => {
          console.log(data);
        });
        Swal.fire(
          '¡Pagada!',
          'Se ha marcado la orden como pagada',
          'success'
        ).then(() => {
          this._location.back();
        });
      }
    });
  }
}

// Swal.fire(
//   'Deleted!',
//   'Your file has been deleted.',
//   'success'
// )

// Swal.fire({
//   icon: 'error',
//   title: 'Oops...',
//   text: '¡Ocurrió un error!',
//   footer: error,
// })

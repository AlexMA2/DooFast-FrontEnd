import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderData } from 'src/app/models/Order';

@Component({
  selector: 'app-take-order',
  templateUrl: './take-order.component.html',
  styleUrls: ['./take-order.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TakeOrderComponent implements OnInit {
  tableNumber: number = -1;
  pedido: OrderData = {
    idOrden: null,
    idMesa: 1,
    idComida: 1,
    nombreComida: '',
    nombreCategoria: 'No definido',
    idPedido: 'A00',
    precio: 0,
    cantidad: 0,
    fechaCreacion: new Date(),
    estadoOrden: null,
    saved: false,
  };
  savingOrder: boolean = false;

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tableNumber = this.route.snapshot.params.id;
  }

  getFoodPicked(product: OrderData) {
    this.pedido = product;
  }

  openDialog(): void {
    this.dialog.open(ConfirmationComponent, {
      width: '350px',
      data: {
        title: '¿Estás seguro de salir sin guardar?',
        message:
          'Esta acción eliminará los cambios recientes que hiciste en la orden.',
      },
    });
  }

  saveOrder(): void {
    this.savingOrder = true;
  }
}

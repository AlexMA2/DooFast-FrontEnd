import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { OrderData } from 'src/app/models/Order';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css'],
})
export class ProductContainerComponent {
  @Input() tableNumber!: number;
  @Input() products!: Product[];
  @Input() category!: string;
  @Output() foodPicked: EventEmitter<any> = new EventEmitter();

  counter: number = 0;

  pickFood(prod: Product): void {
    let newOrder: OrderData;
    newOrder = {
      idMesa: this.tableNumber,
      nombreComida: prod.nombreComida,
      nombreCategoria: prod.nombreCategoria,
      precio: prod.precio,
      idOrden: null,
      fechaCreacion: null,
      cantidad: 1,
      estadoOrden: 'Por servir',
      idComida: prod.idComida,
      saved: false,
      idPedido: prod.nombreCategoria.substring(0, 2) + this.counter,
    };

    this.counter++;
    this.foodPicked.emit(newOrder);
  }
}

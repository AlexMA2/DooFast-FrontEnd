import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { OrderData } from 'src/app/models/Order';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css'],
})
export class ProductContainerComponent {
  // Inputs and Outputs for Waitress User

  @Input() tableNumber!: number;
  @Input() products!: Product[];
  @Input() category!: string;

  @Output() foodPicked: EventEmitter<any> = new EventEmitter();

  // Inputs and Outputs for Admin User

  @Input() admin!: boolean;
  @Output() emitOpenModal: EventEmitter<any> = new EventEmitter();

  counter: number = 0;

  constructor(private productService: ProductService) {}

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
    console.log(newOrder.idPedido);
    this.foodPicked.emit(newOrder);
  }

  openModal(): void {
    this.emitOpenModal.emit(this.category);
  }

  deleteFoodFromMenu(p: Product): void {
    console.log('Eliminando');
    this.products = this.products.filter(
      (product) => product.idComida !== p.idComida
    );

    this.productService.deleteFoodFromMenu(p.idComida, 1).subscribe((data) => {
      console.log(data);
    });
  }
}

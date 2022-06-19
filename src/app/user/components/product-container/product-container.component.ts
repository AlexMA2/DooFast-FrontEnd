import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css'],
})
export class ProductContainerComponent implements OnInit {
  @Input() tableNumber!: number;
  @Input() products!: Product[];
  @Input() category!: string;
  @Output() foodPicked: EventEmitter<any> = new EventEmitter();

  counter: number = 0;

  constructor() {}

  ngOnInit(): void {}

  pickFood(prod: Product): void {
    let newProduct: Product;
    newProduct = {
      ...prod,
      nombreCategoria: this.category,
      idPedido: this.category[0] + this.category[1] + this.counter,
    };

    this.counter++;

    this.foodPicked.emit(newProduct);
  }
}

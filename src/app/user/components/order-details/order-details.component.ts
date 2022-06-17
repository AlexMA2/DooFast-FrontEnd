import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() tableNumber!: number;
  @Input() pedido?: Product;

  voucherEntries = ['Entradas', 'Platos Principales', 'Bebidas', 'Postres'];

  Entradas?: Product[] = [];
  Principales?: Product[] = [];
  Bebidas?: Product[] = [];
  Postres?: Product[] = [];

  constructor() {
    console.log(this.pedido);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('CAMBIO');
    this.pedido = changes.pedido.currentValue;

    const category = this.pedido?.nombreCategoria || 'Entradas';

    switch (category) {
      case 'Entrada':
        if (this.Entradas && this.pedido) {
          this.Entradas.push(this.pedido);
        }

        break;
      case 'Principal':
        if (this.Principales && this.pedido) {
          this.Principales.push(this.pedido);
        }
        break;
      case 'Bebida':
        if (this.Bebidas && this.pedido) {
          this.Bebidas.push(this.pedido);
        }
        break;
      case 'Postre':
        if (this.Postres && this.pedido) {
          this.Postres.push(this.pedido);
        }
        break;
    }
  }

  ngOnInit(): void {}
}

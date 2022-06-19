import { Component, Input, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  @Input() tableNumber!: number;
  @Input() pedido?: Product;
  @Input() saving: boolean = false;

  Entradas: Product[] = [];
  Principales: Product[] = [];
  Bebidas: Product[] = [];
  Postres: Product[] = [];

  constructor(private orderService: OrderService, private route: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pedido) {
      this.pedido = changes.pedido.currentValue;

      const category = this.pedido?.nombreCategoria || 'Entrada';

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

    if (changes?.saving?.currentValue) {
      const voucher = this.createVoucher();

      for (let item of voucher) {
        // this.orderService.addOrder(item).subscribe((response) => {
        //   console.log(response);
        // });
      }
      this.route.navigate(['/waitress']);
    }
  }

  createVoucher() {
    const voucher: Order[] = [];
    let foodsGroupById: any = {};

    foodsGroupById = this.Entradas.concat(
      this.Principales,
      this.Bebidas,
      this.Postres
    ).reduce(function (rv: any, x) {
      (rv[x.idComida] = rv[x.idComida] || []).push(x);
      return rv;
    }, {});

    for (let id in foodsGroupById) {
      const idProducto = Number(id);
      const cantidad = foodsGroupById[id].length;
      const orden: Order = {
        idMesa: this.tableNumber,
        idProducto,
        cantidad,
      };
      voucher.push(orden);
    }

    return voucher;
  }

  deleteFood(product: Product) {
    const category = product.nombreCategoria;

    switch (category) {
      case 'Entrada':
        this.Entradas = this.Entradas?.filter(
          (p) => p.idPedido !== product.idPedido
        );
        break;
      case 'Principal':
        this.Principales = this.Principales?.filter(
          (p) => p.idPedido !== product.idPedido
        );
        break;
      case 'Bebida':
        this.Bebidas = this.Bebidas?.filter(
          (p) => p.idPedido !== product.idPedido
        );
        break;
      case 'Postre':
        this.Postres = this.Postres?.filter(
          (p) => p.idPedido !== product.idPedido
        );
        break;
    }
  }
}

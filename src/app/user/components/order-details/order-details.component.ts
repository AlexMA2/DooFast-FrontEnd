import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Order, OrderData } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() tableNumber!: number;
  @Input() pedido?: OrderData;
  @Input() saving: boolean = false;

  Entradas: OrderData[] = [];
  Principales: OrderData[] = [];
  Bebidas: OrderData[] = [];
  Postres: OrderData[] = [];

  constructor(
    private orderService: OrderService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.orderService
      .getOrderByTableNumber(this.tableNumber)
      .subscribe((response) => this.loadOrder(response));
  }

  loadOrder(orders: OrderData[]) {
    if (orders && orders.length > 0) {
      for (let order of orders) {
        const category = order.nombreCategoria;
        switch (category) {
          case 'Entrada':
            if (this.Entradas && order) {
              order.saved = true;
              for (let i = 0; i < order.cantidad; i++) {
                this.Entradas.push(order);
              }
            }

            break;
          case 'Principal':
            if (this.Principales && order) {
              order.saved = true;
              for (let i = 0; i < order.cantidad; i++) {
                this.Principales.push(order);
              }
            }
            break;
          case 'Bebida':
            if (this.Bebidas && order) {
              order.saved = true;
              for (let i = 0; i < order.cantidad; i++) {
                this.Bebidas.push(order);
              }
            }
            break;
          case 'Postre':
            if (this.Postres && order) {
              order.saved = true;
              for (let i = 0; i < order.cantidad; i++) {
                this.Postres.push(order);
              }
            }
            break;
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pedido) {
      this.pedido = changes.pedido.currentValue;

      const category = this.pedido?.nombreCategoria;
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
      let res = '';
      for (let item of voucher) {
        this.orderService.addOrder(item).subscribe((response) => {
          res = response;
        });
      }

      this.openSnackBar('Se ha guardado correctamente', 'Cerrar');
      this.route.navigate(['/waitress']);
    }
  }

  createVoucher() {
    const voucher: Order[] = [];
    let foodsGroupById: any = {};

    foodsGroupById = this.Entradas.filter((p) => !p.saved)
      .concat(
        this.Principales.filter((p) => !p.saved),
        this.Bebidas.filter((p) => !p.saved),
        this.Postres.filter((p) => !p.saved)
      )
      .reduce(function (rv: any, x) {
        (rv[x.idComida] = rv[x.idComida] || []).push(x);
        return rv;
      }, {});

    for (let id in foodsGroupById) {
      const idComida = Number(id);
      const idMesa = Number(this.tableNumber);
      const cantidad = foodsGroupById[id].length;
      const orden: Order = {
        idMesa,
        idComida,
        cantidad,
      };
      voucher.push(orden);
    }

    return voucher;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  deleteFood(product: OrderData) {
    const category = product.nombreCategoria;

    switch (category) {
      case 'Entrada':
        this.Entradas = this.Entradas?.filter((p) => {
          return this.isSaved(p, product);
        });
        break;
      case 'Principal':
        this.Principales = this.Principales?.filter((p) => {
          return this.isSaved(p, product);
        });
        break;
      case 'Bebida':
        this.Bebidas = this.Bebidas?.filter((p) => {
          return this.isSaved(p, product);
        });
        break;
      case 'Postre':
        this.Postres = this.Postres?.filter((p) => {
          return this.isSaved(p, product);
        });
        break;
    }
  }

  isSaved(p: OrderData, product: OrderData) {
    if (!p.saved) {
      return p.idPedido !== product.idPedido;
    } else {
      return p.idOrden !== product.idOrden;
    }
  }
}

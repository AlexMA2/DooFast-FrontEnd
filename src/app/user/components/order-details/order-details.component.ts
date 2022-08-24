import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Order, OrderData } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Table } from 'src/app/models/Table';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() tableNumber!: number;
  @Input() pedido!: OrderData;
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
        this.addOrderByCategory(category, order);
      }
    }
  }

  /*
    This function allows put every order into the orders details component. 
    Pick an order and based on the category, add it to the corresponding array. Then,
    a saved attribute is set to true to avoid adding the same order twice.

    @param {OrderData} order - The order to be added to the array.
    @param {string} category - The category of the order.

    @returns {void} - Nothing is returned.

    @memberOf OrderDetailsComponent
  
  */

  addOrderByCategory(category: string, order: OrderData) {
    switch (category) {
      case 'Entrada':
        order.saved = true;
        for (let i = 0; i < order.cantidad; i++) {
          this.Entradas.push(order);
        }

        break;
      case 'Principal':
        order.saved = true;
        for (let i = 0; i < order.cantidad; i++) {
          this.Principales.push(order);
        }

        break;
      case 'Bebida':
        order.saved = true;
        for (let i = 0; i < order.cantidad; i++) {
          this.Bebidas.push(order);
        }

        break;
      case 'Postre':
        order.saved = true;
        for (let i = 0; i < order.cantidad; i++) {
          this.Postres.push(order);
        }

        break;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pedido) {
      this.pedido = changes.pedido.currentValue;

      const category = this.pedido?.nombreCategoria;
      this.addOrder(category);
    }

    if (changes?.saving?.currentValue) {
      const voucher = this.createVoucher();

      for (let item of voucher) {
        this.orderService.addOrder(item).subscribe();
      }

      this.openSnackBar('Se ha guardado correctamente', 'Cerrar');
      this.route.navigate(['/waitress']);
    }
  }

  addOrder(category: string = 'Entrada') {
    switch (category) {
      case 'Entrada':
        this.Entradas.push(this.pedido);

        break;
      case 'Principal':
        this.Principales.push(this.pedido);
        break;
      case 'Bebida':
        this.Bebidas.push(this.pedido);
        break;
      case 'Postre':
        this.Postres.push(this.pedido);
        break;
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
        if (!rv[x.idComida]) {
          rv[x.idComida] = [];
        }
        rv[x.idComida].push(x);
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

    if (product.saved && product.idOrden) {
      this.orderService.deleteOrder(product.idOrden).subscribe();
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

import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() tableNumber!: number;
  @Input() pedido?: Product;
  @Input() saving: boolean = false;

  voucherEntries = ['Entradas', 'Platos Principales', 'Bebidas', 'Postres'];

  Entradas?: Product[] = [];
  Principales?: Product[] = [];
  Bebidas?: Product[] = [];
  Postres?: Product[] = [];

  constructor(private orderService: OrderService, private route: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pedido) {
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

    if (changes?.saving?.currentValue) {
      const arrayOrden = this.createArrayOrden();
      console.log('IMPRIMIENDO ARRAY');
      for (let orden of arrayOrden) {
        // this.orderService.addOrder(orden).subscribe((response) => {
        //   console.log(response);
        // });
        console.log(orden);
        this.route.navigate(['/waitress']);
      }
    }
  }

  createArrayOrden() {
    const arrayOrden: Order[] = [];
    const idComidasJuntadas: number[] = [];
    console.log(this.Entradas);
    this.Entradas?.forEach((e) => {
      console.log(e.idComida);
      idComidasJuntadas.push(e.idComida);
    });
    this.Principales?.forEach((e) => {
      console.log(e.idComida);
      idComidasJuntadas.push(e.idComida);
    });
    this.Bebidas?.forEach((e) => {
      console.log(e.idComida);
      idComidasJuntadas.push(e.idComida);
    });
    this.Postres?.forEach((e) => {
      console.log(e.idComida);
      idComidasJuntadas.push(e.idComida);
    });

    console.log('ID COMIDAS JUNTADAS');
    console.log(idComidasJuntadas);

    idComidasJuntadas.sort(function (a, b) {
      return a - b;
    });

    console.log('ID COMIDAS JUNTADAS ORDENADAS');
    console.log(idComidasJuntadas);

    let idComidasJuntadasConCantidad: any[] = [];

    let idComidaPrev = -999;

    idComidasJuntadas.forEach((id) => {
      if (id !== idComidaPrev) {
        idComidasJuntadasConCantidad.push({
          idComida: id,
          cantidad: 1,
        });
      } else {
        idComidasJuntadasConCantidad[idComidasJuntadasConCantidad.length - 1]
          .cantidad++;
      }
      idComidaPrev = id;
    });

    for (let i = 0; i < idComidasJuntadasConCantidad.length; i++) {
      const idComida = idComidasJuntadasConCantidad[i].idComida;
      const cantidad = idComidasJuntadasConCantidad[i].cantidad;
      const orden: Order = {
        idMesa: this.tableNumber,
        idProducto: idComida,
        cantidad: cantidad,
      };
      arrayOrden.push(orden);
    }

    return arrayOrden;
  }

  deleteFood(product: Product) {
    const category = product.nombreCategoria;

    switch (category) {
      case 'Entrada':
        this.Entradas = this.Entradas?.filter(
          (p) => p.idComida !== product.idComida
        );
        break;
      case 'Principal':
        this.Principales = this.Principales?.filter(
          (p) => p.idComida !== product.idComida
        );
        break;
      case 'Bebida':
        this.Bebidas = this.Bebidas?.filter(
          (p) => p.idComida !== product.idComida
        );
        break;
      case 'Postre':
        this.Postres = this.Postres?.filter(
          (p) => p.idComida !== product.idComida
        );
        break;
    }
  }

  ngOnInit(): void {}
}

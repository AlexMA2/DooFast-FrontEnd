import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product';
import { ViewEncapsulation } from '@angular/core';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';
import { menu_fake } from '../../constants/menu-fake';
import { MatDialog } from '@angular/material/dialog';
import { OrderData } from 'src/app/models/Order';

@Component({
  selector: 'app-take-order',
  templateUrl: './take-order.component.html',
  styleUrls: ['./take-order.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TakeOrderComponent implements OnInit {
  starters: Product[] = [];
  mainDishes: Product[] = [];
  drinks: Product[] = [];
  desserts: Product[] = [];
  error?: string;
  tableNumber: number = -1;
  pedido?: OrderData;
  savingOrder: boolean = false;

  isError: boolean = false;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.tableNumber = this.route.snapshot.params.id;
  }

  getFoodPicked(product: OrderData) {
    this.pedido = product;
  }

  separateProducts(products: any[]) {
    this.starters = products[0];
    this.mainDishes = products[1];
    this.drinks = products[2];
    this.desserts = products[3];
  }

  getAllProducts(): void {
    this.productService.getAll().subscribe(
      (products) => this.separateProducts(products),
      (error) => {
        this.error = error;
        this.isError = true;
        this.separateProducts(menu_fake);
      }
    );
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

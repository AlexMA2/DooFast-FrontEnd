import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {

  products: Product[] = [];
  entradas: Product[] = [];
  platos: Product[] = [];
  bebidas: Product[] = [];
  postres: Product[] = [];

  constructor(
    public dialog: MatDialog,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getAllDish();
  }

  getAllDish() {
    this.productService.getAllFood().subscribe(
      (products) => this.separateProducts(products),
      err => console.error(err)
    );
  }

  separateProducts(products: any[]) {
    this.entradas = products[0];
    this.platos = products[1];
    this.bebidas = products[2];
    this.postres = products[3];
  }

}

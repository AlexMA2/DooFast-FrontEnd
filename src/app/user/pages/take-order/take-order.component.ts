import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-take-order',
  templateUrl: './take-order.component.html',
  styleUrls: ['./take-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TakeOrderComponent implements OnInit {

  starters: Product[] = []
  mainDishes: Product[] = []
  drinks: Product[] = []
  desserts: Product[] = []

  constructor(
    private productService: ProductService
  
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
   }
 
   separateProducts(products: any[]) {
     console.log(products)
      this.starters = products[0];
      this.mainDishes =  products[1];
      this.drinks =  products[2];
      this.desserts =  products[3];
   }

   getAllProducts(): void {  
     this.productService.getAll()
       .subscribe(products => this.separateProducts(products));
   }
}

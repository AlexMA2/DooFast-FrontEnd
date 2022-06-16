import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product';
import { ViewEncapsulation } from '@angular/core';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  error?: string
  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
   }
 
   separateProducts(products: any[]) {
    
      this.starters = products[0];
      this.mainDishes =  products[1];
      this.drinks =  products[2];
      this.desserts =  products[3];
   }

   getAllProducts(): void {  
     this.productService.getAll()
       .subscribe(products => this.separateProducts(products), error => this.error = error);
   }

   openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '400px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }
}

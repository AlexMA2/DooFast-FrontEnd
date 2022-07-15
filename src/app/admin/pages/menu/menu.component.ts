import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../../component/product-list/product-list.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  products: any = {
    Entrada: [] as Product[],
    Principal: [] as Product[],
    Bebida: [] as Product[],
    Postre: [] as Product[],
  };

  newProduct?: Product;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllFood().subscribe((data) => {
      this.separateProducts(data);
    });
  }

  addFoodToMenu(food: Product): void {
    this.productService.addFoodToMenu(food.idComida).subscribe((data) => {
      this._snackBar.open(
        'Se ha eliminado el producto "' + data.nombreComida + '" de la lista.',
        'Cerrar',
        {
          duration: 3000,
        }
      );
    });
  }

  separateProducts(products: Product[]) {
    this.products.Entrada = products[0];
    this.products.Principal = products[1];
    this.products.Bebida = products[2];
    this.products.Postre = products[3];
  }

  openDialog(category: string): void {
    const categoryProducts = this.products[category];
    const dialogRef = this.dialog.open(ProductListComponent, {
      width: '80vw',
      data: categoryProducts,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newProduct = result;
        this.addFoodToMenu(result);
      }
    });
  }
}

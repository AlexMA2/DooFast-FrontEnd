import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../../component/product-list/product-list.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product';

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

  constructor(
    public dialog: MatDialog,
    private productService: ProductService
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
      console.log(data);
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
        this.addFoodToMenu(result);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product';
import { product_fake } from '../../utils/products_fake';
import { AddDishComponent } from '../../component/add-dish/add-dish.component';

interface ProductAttribute {
  value: string;
  name: string;
}

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
})
export class DishesComponent implements OnInit {
  products: Product[] = [];
  filter: string = '';
  productAttributes: ProductAttribute[] = [
    { value: 'nombreComida', name: 'Nombre' },
    { value: 'precio', name: 'Precio' },
    { value: 'costo', name: 'Costo' },
    { value: 'nombreCategoria', name: 'Categoria' },
    { value: 'fechaCategoria', name: 'Fecha de Creación' },
  ];
  constructor(
    public dialog: MatDialog,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllDish();
  }

  getAllDish() {
    this.productService.getAllFood().subscribe(
      (data) => {
        this.products = data[0].concat(data[1], data[2], data[3]);
        console.log(this.products);
      },
      (err) => (this.products = product_fake)
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDishComponent, {
      width: '30vw',
    });

    dialogRef.afterClosed().subscribe((result: FormData) => {
      if (result) {
        this.productService.addProduct(result).subscribe((data) => {
          console.log(data);
        });
      }
    });
  }
}

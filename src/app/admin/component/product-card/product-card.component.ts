import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product/product.service';
import { AddDishComponent } from '../../component/add-dish/add-dish.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDishComponent, {
      width: '30vw',
      data: this.product,
    });

    dialogRef.afterClosed().subscribe((result: FormData) => {
      if (result) {
        this.productService.editProduct(result).subscribe((data) => {
          this._snackBar.open('El product ha sido modificado', 'Cerrar', {
            duration: 3000,
          });
        });
      }
    });
  }
}

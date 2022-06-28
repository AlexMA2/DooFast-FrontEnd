import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = [];
  constructor(
    public dialogRef: MatDialogRef<ProductListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product[]
  ) {}

  ngOnInit(): void {
    this.displayedColumns = [
      'idComida',
      'nombreComida',
      'precio',
      'costo',
      'acciones',
    ];
    console.log('DATA', this.data);
  }

  onAddProduct(product: Product): void {
    this.dialogRef.close(product);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

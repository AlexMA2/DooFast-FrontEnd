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

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
}

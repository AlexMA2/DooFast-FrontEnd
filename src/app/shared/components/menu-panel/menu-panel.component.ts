import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product';
import { ViewEncapsulation } from '@angular/core';
import { menu_fake } from 'src/app/shared/utils/menu_fake';
import { OrderData } from 'src/app/models/Order';

@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MenuPanelComponent implements OnInit {
  starters: Product[] = [];
  mainDishes: Product[] = [];
  drinks: Product[] = [];
  desserts: Product[] = [];
  error?: string;
  tableNumber: number = -1;
  pedido?: OrderData;
  savingOrder: boolean = false;

  @Input() getFoodPicked: any;

  isError: boolean = false;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.tableNumber = this.route.snapshot.params.id;
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
}

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product';
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

  totalPlates: any = {
    Entrada: [] as Product[],
    Principal: [] as Product[],
    Bebida: [] as Product[],
    Postre: [] as Product[],
  };

  @Output() pedido: EventEmitter<OrderData> = new EventEmitter();

  admin: boolean = false;
  savingOrder: boolean = false;

  isError: boolean = false;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProductsFromMenu();
    this.getAllProducts();
    this.tableNumber = this.route.snapshot.params.id;
    // Por hacer
    // VALIDAR SI ES ADMIN UTILIZANDO EL KEY DEL LOGIN
    if (this.router.url.split('/')[1] === 'admin') {
      this.admin = true;
    }
  }

  getFoodPicked(product: OrderData) {
    this.pedido.emit(product);
  }

  separateProducts(products: any[]) {
    this.starters = products[0];
    this.mainDishes = products[1];
    this.drinks = products[2];
    this.desserts = products[3];
  }

  getAllProductsFromMenu(): void {
    this.productService.getAll().subscribe(
      (products) => this.separateProducts(products),
      (error) => {
        this.error = error;
        this.isError = true;
        this.separateProducts(menu_fake);
      }
    );
  }

  getAllProducts(): void {
    this.productService.getAllFood().subscribe((data) => {
      this.totalPlates.Entrada = data[0];
      this.totalPlates.Principal = data[1];
      this.totalPlates.Bebida = data[2];
      this.totalPlates.Postre = data[3];
    });
  }
}

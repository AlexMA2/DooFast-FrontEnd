import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  @Input() productToAdd?: Product;
  @Output() pedido: EventEmitter<OrderData> = new EventEmitter();
  @Output() emitOpenModal: EventEmitter<any> = new EventEmitter();

  admin: boolean = false;
  savingOrder: boolean = false;

  isError: boolean = false;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.tableNumber = this.route.snapshot.params.id;
    // TODO
    // VALIDAR SI ES ADMIN UTILIZANDO EL KEY DEL LOGIN
    if (this.router.url.split('/')[1] === 'admin') {
      this.admin = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.productToAdd) {
      const p: Product = changes.productToAdd.currentValue;
      console.log('TO ADD', p);
      if (p) {
        switch (p.nombreCategoria) {
          case 'Entrada':
            if (!this.starters.find((x) => x.idComida === p.idComida))
              this.starters.push(p);

            break;
          case 'Principal':
            if (!this.mainDishes.find((x) => x.idComida === p.idComida))
              this.mainDishes.push(p);

            break;
          case 'Bebida':
            if (!this.drinks.find((x) => x.idComida === p.idComida))
              this.drinks.push(p);
            break;
          case 'Postre':
            if (!this.desserts.find((x) => x.idComida === p.idComida))
              this.desserts.push(p);
            break;
        }
      }
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

  openModal(category: string) {
    this.emitOpenModal.emit(category);
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

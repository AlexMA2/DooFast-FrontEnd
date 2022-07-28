import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { Product } from 'src/app/models/Product';
import { OrderData } from 'src/app/models/Order';
import { ProductService } from 'src/app/services/product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProductListComponent } from 'src/app/admin/component/product-list/product-list.component';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css'],
})
export class ProductContainerComponent {
  // Inputs and Outputs for Waitress User

  @Input() tableNumber!: number;
  @Input() products!: Product[];
  @Input() category!: string;

  @Output() foodPicked: EventEmitter<any> = new EventEmitter();

  // Inputs and Outputs for Admin User

  @Input() admin!: boolean;
  @Input() totalProducts!: Product[];
  @Output() orderToDelete: EventEmitter<OrderData> = new EventEmitter();

  counter: number = 0;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.products) {
      this.products = changes.products.currentValue;
    }
    if (changes.category) {
      this.category = changes.category.currentValue;
    }
  }

  pickFood(prod: Product): void {
    let newOrder: OrderData;
    newOrder = {
      idMesa: this.tableNumber,
      nombreComida: prod.nombreComida,
      nombreCategoria: prod.nombreCategoria,
      precio: prod.precio,
      idOrden: null,
      fechaCreacion: new Date(),
      cantidad: 1,
      estadoOrden: 'Por servir',
      idComida: prod.idComida,
      saved: false,
      imagen: prod.imagen,
      idPedido: prod.nombreCategoria.substring(0, 2) + this.counter,
    };

    this.counter++;
    this.foodPicked.emit(newOrder);
  }

  deleteFoodFromMenu(p: Product): void {
    this.products = this.products.filter(
      (product) => product.idComida !== p.idComida
    );

    this.productService.deleteFoodFromMenu(p.idComida).subscribe(() => {
      this._snackBar.open(
        'Se ha eliminado el producto "' + p.nombreComida + '" de la lista.',
        'Cerrar',
        {
          duration: 3000,
        }
      );
    });
  }

  addFoodToMenu(food: Product): void {
    this.products.push(food);
    this.productService.addFoodToMenu(food.idComida).subscribe(() => {
      this._snackBar.open(
        'Se ha agregado el producto "' + food.nombreComida + '" a la lista.',
        'Cerrar',
        {
          duration: 3000,
        }
      );
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductListComponent, {
      width: '80vw',
      data: this.totalProducts,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.addFoodToMenu(result);
      }
    });
  }
}

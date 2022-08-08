import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product';
import { product_fake } from '../../utils/products_fake';
import { AddDishComponent } from '../../component/add-dish/add-dish.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ProductAttribute {
  value: string;
  name: string;
}

interface Categories {
  value: number;
  name: string;
}

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
})
export class DishesComponent implements OnInit {
  products: Product[] = [];

  totalProducts: Product[] = [];

  filter: string = '';
  productAttributes: ProductAttribute[] = [
    { value: 'nombreComida', name: 'Nombre' },
    { value: 'precio', name: 'Precio' },
    { value: 'costo', name: 'Costo' },
    { value: 'nombreCategoria', name: 'Categoria' },
    { value: 'fechaCategoria', name: 'Fecha de Creación' },
  ];

  values: Categories[] = [
    { value: 1, name: 'Entrada' },
    { value: 2, name: 'Principal' },
    { value: 3, name: 'Bebida' },
    { value: 4, name: 'Postre' },
  ];

  filters!: FormGroup;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllDish();
    this.filters = this.formBuilder.group({
      name: [''],
      category: [''],
      price: [0],
      cost: [0],
      start: [null],
      end: [null],
    });
  }

  getAllDish() {
    this.productService.getAllFood().subscribe(
      (data) => {
        this.products = data[0].concat(data[1], data[2], data[3]);
        this.totalProducts = this.products;
      },
      (err) => {
        this.products = product_fake;
        this.totalProducts = this.products;
      }
    );
  }

  filterBy() {
    this.products = this.totalProducts;
    switch (this.filter) {
      case 'nombreComida':
        this.filterByNombreComida();
        break;
      case 'precio':
        this.filterByPrecio();
        break;
      case 'costo':
        this.filterByCosto();
        break;
      case 'nombreCategoria':
        this.filterByCategory();
        break;
      case 'fechaCategoria':
        this.filterByDate();
        break;
    }
  }

  filterByNombreComida() {
    const name = this.filters.value.name;
    if (name.length > 0) {
      this.products = this.products.filter((product) =>
        product.nombreComida.toLowerCase().includes(name.toLowerCase())
      );
      this.showSnackBar('Se aplico el filtro por nombre');
    } else {
      this.showSnackBar('No se ha escrito ningun texto de busqueda');
    }
  }

  filterByPrecio() {
    const price = this.filters.value.price;
    if (price > 0) {
      this.products = this.products.filter((product) => product.precio > price);
      this.showSnackBar('Se aplico el filtro por precio');
    } else {
      this.showSnackBar('El filtro de precio debe ser mayor a 0');
    }
  }

  filterByCosto() {
    const cost = this.filters.value.cost;
    if (cost > 0) {
      this.products = this.products.filter((product) => product.precio > cost);
      this.showSnackBar('Se aplico el filtro por costo');
    } else {
      this.showSnackBar('El filtro de costo debe ser mayor a 0');
    }
  }

  filterByCategory() {
    const categoria = this.filters.value.category;
    if (categoria >= 1 && categoria <= 4) {
      this.products = this.products.filter((product) =>
        this.equalCategory(categoria, product.nombreCategoria)
      );
      this.showSnackBar('Se aplico el filtro por categoria');
    } else {
      this.showSnackBar('No existe la categoria seleccionada');
    }
  }

  filterByDate() {
    const start = this.filters.value.start;
    const end = this.filters.value.end;
    if (start && end) {
      this.products = this.products.filter(
        (product) =>
          product.fechaCreacion > start && product.fechaCreacion < end
      );
      this.showSnackBar('Se aplico el filtro por fecha');
    } else {
      this.showSnackBar('No se ha seleccionado un rango de fecha valido');
    }
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 2000,
    });
  }

  equalCategory(idCategory: number, category: string) {
    if (idCategory === 1 && category === 'Entrada') {
      return true;
    }
    if (idCategory === 2 && category === 'Principal') {
      return true;
    }
    if (idCategory === 3 && category === 'Bebida') {
      return true;
    }
    if (idCategory === 4 && category === 'Postre') {
      return true;
    }
    return false;
  }

  cleanFilters() {
    this.products = this.totalProducts;
    this.filters.reset();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDishComponent, {
      width: '30vw',
      data: {
        idComida: -999,
        nombreComida: '',
        precio: 0.0,
        costo: 0.0,
        imagen: null,
        nombreCategoria: '',
        fechaCreacion: new Date(),
      } as Product,
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

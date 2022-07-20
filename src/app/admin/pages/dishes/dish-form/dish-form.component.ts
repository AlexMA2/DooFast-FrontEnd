import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css']
})
export class DishFormComponent implements OnInit {

  prod: Product = {
    idComida: 0,
    nombreComida: '',
    precio: 0,
    costo: 0,
    imagen: '',
    imagePath: '',
    nombreCategoria: '',
    fechaCreacion: new Date()
  };

  selectedFile = File;
  files: any = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  addProduct() {
    
    const f = this.files[0];
    console.log(f);
    
    switch (this.prod.nombreCategoria) {
      case 'Entrada':
        this.productService.addFood(this.prod.nombreComida, this.prod.precio, this.prod.costo, 1, f)
          .subscribe(
            res => {
              console.log(res);
              this.router.navigate(['/admin/dishes']);
            },
            err => console.error(err)
          )

        break;
      case 'Principal':
        this.productService.addFood(this.prod.nombreComida, this.prod.precio, this.prod.costo, 2, f)
          .subscribe(
            res => {
              console.log(res);
              this.router.navigate(['/admin/dishes']);
            },
            err => console.error(err)
          )

        break;
      case 'Bebida':
        this.productService.addFood(this.prod.nombreComida, this.prod.precio, this.prod.costo, 3, f)
          .subscribe(
            res => {
              console.log(res);
              this.router.navigate(['/admin/dishes']);
            },
            err => console.error(err)
          )

        break;
      case 'Postre':
        this.productService.addFood(this.prod.nombreComida, this.prod.precio, this.prod.costo, 4, f)
          .subscribe(
            res => {
              console.log(res);
              this.router.navigate(['/admin/dishes']);
            },
            err => console.error(err)
          )

        break;
    }
    
  }

  seleccionarArchivo(event: any){
    const im = event.target.files[0];
    console.log(im);
    this.files.push(im);
  }

  test() {
    console.log(this.prod.nombreComida);
    console.log(this.prod.precio);
    console.log(this.prod.costo);
    console.log(this.prod.nombreCategoria);
  }

}

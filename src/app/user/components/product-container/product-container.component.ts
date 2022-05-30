import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css']
})
export class ProductContainerComponent implements OnInit {

  @Input() products!: Product[]; 

  constructor(   ) { }

  ngOnInit(): void {
  }

  pickFood(prod : Product) : void {
    console.log("pick food");
  }
}

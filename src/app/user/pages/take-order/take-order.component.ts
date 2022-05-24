import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-take-order',
  templateUrl: './take-order.component.html',
  styleUrls: ['./take-order.component.css']
})
export class TakeOrderComponent implements OnInit {

  starters: Product[] = []
  mainDishes: Product[] = []
  drinks: Product[] = []
  desserts: Product[] = []

  constructor() { }

  ngOnInit(): void {
  }

}

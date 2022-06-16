import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { SimpleChanges } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css']
})
export class ProductContainerComponent implements OnInit {

  @Input() tableNumber!: number;
  @Input() products!: Product[]; 
  @Output() foodPicked: EventEmitter<any> = new EventEmitter();
  
  constructor(  
    private orderService: OrderService
   ) { }

  ngOnInit(): void {
    this.orderService.setTableId(1);
  }

  pickFood(prod : Product) : void {
    
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiningTableComponent } from './components/dining-table/dining-table.component';
import { DiningTableContainerComponent } from './pages/dining-table-container/dining-table-container.component';
import { TakeOrderComponent } from './pages/take-order/take-order.component';
import { UserRoutingModule } from './user-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import { ProductContainerComponent } from './components/product-container/product-container.component'; 
import {MatButtonModule} from '@angular/material/button';
import { OrderDetailsComponent } from './components/order-details/order-details.component'; 

@NgModule({
  declarations: [
    DiningTableComponent,
    DiningTableContainerComponent,
    TakeOrderComponent,
    ProductContainerComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTabsModule,
    MatButtonModule
  ],
  exports: [
    DiningTableContainerComponent,
    TakeOrderComponent
  ]
})
export class UserModule { }

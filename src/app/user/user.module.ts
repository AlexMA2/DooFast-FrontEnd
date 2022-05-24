import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiningTableComponent } from './components/dining-table/dining-table.component';
import { DiningTableContainerComponent } from './components/dining-table-container/dining-table-container.component';
import { TakeOrderComponent } from './pages/take-order/take-order.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    DiningTableComponent,
    DiningTableContainerComponent,
    TakeOrderComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports: [
    DiningTableContainerComponent,
    TakeOrderComponent
  ]
})
export class UserModule { }

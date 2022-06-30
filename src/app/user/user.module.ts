import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiningTableComponent } from './components/dining-table/dining-table.component';
import { SharedModule } from '../shared/shared.module';
import { DiningTableContainerComponent } from './pages/dining-table-container/dining-table-container.component';
import { TakeOrderComponent } from './pages/take-order/take-order.component';
import { UserRoutingModule } from './user-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PendingOrdersListComponent } from './pages/pending-orders-list/pending-orders-list.component';
import { PendingOrderComponent } from './components/pending-order/pending-order.component';

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DiningTableComponent,
    DiningTableContainerComponent,
    TakeOrderComponent,
    OrderDetailsComponent,
    ConfirmationComponent,
    PendingOrdersListComponent,
    PendingOrderComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSnackBarModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    DiningTableContainerComponent,
    TakeOrderComponent,
    ReactiveFormsModule,
  ],
})
export class UserModule {}

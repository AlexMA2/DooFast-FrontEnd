import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiningTableContainerComponent } from './pages/dining-table-container/dining-table-container.component';
import { TakeOrderComponent } from './pages/take-order/take-order.component';
import { PendingOrdersListComponent } from './pages/pending-orders-list/pending-orders-list.component';

const WaitressRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dining-tables',
    pathMatch: 'full',
  },
  {
    path: 'dining-tables',
    component: DiningTableContainerComponent,
  },
  {
    path: 'take-order/:id',
    component: TakeOrderComponent,
  },
  {
    path: 'cocina',
    component: PendingOrdersListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(WaitressRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

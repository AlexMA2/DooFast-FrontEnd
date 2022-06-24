import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiningTableContainerComponent } from './user/pages/dining-table-container/dining-table-container.component';
import { TakeOrderComponent } from './user/pages/take-order/take-order.component';

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
<<<<<<< HEAD
=======
  {
    path: 'cocina',
    component: PendingOrdersListComponent,
  },
>>>>>>> 5816c9e58f1afee16c92c3b9778b037a4a57a116
];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'waitress',
    pathMatch: 'full',
  },
  {
    path: 'waitress',
    children: WaitressRoutes,
  },
  {
    path: '**',
    redirectTo: 'waitress',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

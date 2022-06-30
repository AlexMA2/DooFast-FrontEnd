import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiningTableContainerComponent } from './user/pages/dining-table-container/dining-table-container.component';
import { TakeOrderComponent } from './user/pages/take-order/take-order.component';
import { EconomyComponent } from './admin/pages/economy/economy.component';
import { EmployeesComponent } from './admin/pages/employees/employees.component';
import { MenuComponent } from './admin/pages/menu/menu.component';
import { PendingOrdersListComponent } from './user/pages/pending-orders-list/pending-orders-list.component';
import { LoginComponent } from './user/components/login/login.component';

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
];

const AdminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full',
  },
  {
    path: 'economy',
    component: EconomyComponent,
  },
  {
    path: 'employees',
    component: EmployeesComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
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
    path: 'admin',
    children: AdminRoutes,
  },
  {
    path: 'cocina',
    component: PendingOrdersListComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
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

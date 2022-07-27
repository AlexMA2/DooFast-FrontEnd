import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiningTableContainerComponent } from './user/pages/dining-table-container/dining-table-container.component';
import { TakeOrderComponent } from './user/pages/take-order/take-order.component';
import { EconomyComponent } from './admin/pages/economy/economy.component';
import { EmployeesComponent } from './admin/pages/employees/employees.component';
import { EmployeeFormComponent } from './admin/pages/employees/employee-form/employee-form.component';
import { MenuComponent } from './admin/pages/menu/menu.component';
import { DishesComponent } from './admin/pages/dishes/dishes.component';
import { PendingOrdersListComponent } from './user/pages/pending-orders-list/pending-orders-list.component';
import { LoginComponent } from './user/components/login/login.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { DishFormComponent } from './admin/pages/dishes/dish-form/dish-form.component';

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
    path: 'employees/newemployee',
    component: EmployeeFormComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'dishes',
    component: DishesComponent,
  },
  {
    path: 'dishes/newdish',
    component: DishFormComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'waitress',
    canActivate: [AuthGuard],
    children: WaitressRoutes,
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
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
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

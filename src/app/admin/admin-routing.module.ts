import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EconomyComponent } from './pages/economy/economy.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { EmployeeFormComponent } from './pages/employees/employee-form/employee-form.component';
import { MenuComponent } from './pages/menu/menu.component';
import { DishesComponent } from './pages/dishes/dishes.component';
import { DishFormComponent } from './pages/dishes/dish-form/dish-form.component';
import { TablesPageComponent } from './pages/tables-page/tables-page.component';

const routes: Routes = [
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
    path: 'tables',
    component: TablesPageComponent,
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

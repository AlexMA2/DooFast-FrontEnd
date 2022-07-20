import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './pages/employees/employees.component';
import { MenuComponent } from './pages/menu/menu.component';
import { EconomyComponent } from './pages/economy/economy.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductListComponent } from './component/product-list/product-list.component';
import { MatButtonModule } from '@angular/material/button';
import { DishManagementComponent } from './dish-management/dish-management.component';
import { DishesComponent } from './pages/dishes/dishes.component';
import { DishFormComponent } from './pages/dishes/dish-form/dish-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeesComponent,
    MenuComponent,
    EconomyComponent,
    ProductListComponent,
    DishManagementComponent,
    DishesComponent,
    DishFormComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [EmployeesComponent, MenuComponent, EconomyComponent, DishesComponent, DishFormComponent],
})
export class AdminModule {}

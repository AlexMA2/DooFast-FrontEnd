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
import { DishesComponent } from './pages/dishes/dishes.component';
<<<<<<< HEAD
import { DishFormComponent } from './pages/dishes/dish-form/dish-form.component';

import { EmployeeFormComponent } from './pages/employees/employee-form/employee-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesPageComponent } from './pages/tables-page/tables-page.component';
import { TableComponent } from './component/table/table.component';

=======
>>>>>>> fix_iteration3
import { AdminRoutingModule } from './admin-routing.module';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { MatCardModule } from '@angular/material/card';
import { AddDishComponent } from './component/add-dish/add-dish.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    EmployeesComponent,
    MenuComponent,
    EconomyComponent,
    ProductListComponent,
    DishesComponent,
<<<<<<< HEAD
    DishFormComponent,
    EmployeeFormComponent,
    TablesPageComponent,
    TableComponent,
=======
>>>>>>> fix_iteration3
    ProductCardComponent,
    AddDishComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    MatTableModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [EmployeesComponent, MenuComponent, EconomyComponent],
})
export class AdminModule {}

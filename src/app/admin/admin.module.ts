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
import { AdminRoutingModule } from './admin-routing.module';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { MatCardModule } from '@angular/material/card';
import { AddDishComponent } from './component/add-dish/add-dish.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

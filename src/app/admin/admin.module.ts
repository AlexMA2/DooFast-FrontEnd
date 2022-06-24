import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './pages/employees/employees.component';
import { MenuComponent } from './pages/menu/menu.component';
import { EconomyComponent } from './pages/economy/economy.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [EmployeesComponent, MenuComponent, EconomyComponent],
  imports: [CommonModule, MatTableModule],
  exports: [EmployeesComponent, MenuComponent, EconomyComponent],
})
export class AdminModule {}

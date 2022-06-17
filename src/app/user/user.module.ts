import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiningTableComponent } from './components/dining-table/dining-table.component';
import { DiningTableContainerComponent } from './components/dining-table-container/dining-table-container.component';
import { CrearMenuComponent } from './components/panel-menu/crear-menu/crear-menu.component';



@NgModule({
  declarations: [
    DiningTableComponent,
    DiningTableContainerComponent,
    CrearMenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DiningTableContainerComponent
  ]
})
export class UserModule { }

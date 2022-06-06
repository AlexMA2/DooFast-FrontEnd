import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiningTableComponent } from './components/dining-table/dining-table.component';
import { DiningTableContainerComponent } from './components/dining-table-container/dining-table-container.component';

@NgModule({
  declarations: [
    DiningTableComponent,
    DiningTableContainerComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DiningTableContainerComponent
  ]
})
export class UserModule { }

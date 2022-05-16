import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiningTableComponent } from './components/dining-table/dining-table.component';



@NgModule({
  declarations: [
    DiningTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DiningTableComponent
  ]
})
export class UserModule { }

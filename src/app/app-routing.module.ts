import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiningTableContainerComponent } from './user/components/dining-table-container/dining-table-container.component';
import { LoginComponent } from './user/components/login/login.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'mesas',
  pathMatch: 'full',  
  }, 
  {
    path: 'mesas',
    component: DiningTableContainerComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

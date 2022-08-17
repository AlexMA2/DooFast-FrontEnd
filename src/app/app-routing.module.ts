import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingOrdersListComponent } from './user/pages/pending-orders-list/pending-orders-list.component';
import { LoginComponent } from './user/components/login/login.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { IsLogGuard } from './guards/is-log.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'waitress',
    canActivate: [AuthGuard],
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'cocina',
    canActivate: [AuthGuard],
    component: PendingOrdersListComponent,
  },
  {
    path: 'login',
    canActivate: [IsLogGuard],
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

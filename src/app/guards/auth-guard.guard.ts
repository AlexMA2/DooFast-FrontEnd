import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

import { Observable } from 'rxjs';
import { User } from '../models/User';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  private data$!: Observable<User>;

  authorizedRoutes: any = {
    Administrador: ['admin', 'waitress', 'cocina'],
    Cocina: ['cocina'],
    Mozo: ['waitress'],
  };

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.data$ = this.auth.getUser;
    let value: User = {
      role: '',
      username: '',
    };

    this.data$.subscribe((data) => (value = data));

    if (value.role === '') {
      value.role = localStorage.getItem('role') || '';
      value.username = localStorage.getItem('username') || '';
    }
    if (value.role.length === 0) {
      return this.router.navigate(['/login']).then(() => false);
    }

    if (!this.isAuthorized(value.role, state.url)) {
      return this.router.navigate(['/login']).then(() => false);
    }
    return true;
  }

  isAuthorized(rol: string, url: string) {
    url = url.split('/')[1];
    if (this.authorizedRoutes[rol].includes(url)) {
      return true;
    }
    return false;
  }
}

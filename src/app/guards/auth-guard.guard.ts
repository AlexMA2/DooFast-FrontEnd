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
    if (
      value.role === 'Mozo' &&
      (this.router.url === '/admin' || this.router.url === '/cocina')
    ) {
      return this.router.navigate(['/waitress']).then(() => false);
    }
    return true;
  }
}

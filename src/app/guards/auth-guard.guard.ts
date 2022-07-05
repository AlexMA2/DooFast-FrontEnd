import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  private data$!: Observable<string>;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.data$ = this.auth.getUserRole;
    let value = '';
    this.data$.subscribe((data) => (value = data));
    console.log(value);
    if (value.length === 0) {
      return this.router.navigate(['/login']).then(() => false);
    }
    if (value === 'Administrador') {
      return this.router.navigate(['/admin']).then(() => true);
    }
    if (value === 'Mozo') {
      return this.router.navigate(['/waitress']).then(() => true);
    }
    if (value === 'Cocina') {
      return this.router.navigate(['/kitchen']).then(() => true);
    }
    return true;
  }
}

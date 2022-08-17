import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class IsLogGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let value: User = {
      role: '' as string,
      username: '' as string,
    };

    value.role = localStorage.getItem('role') || '';
    value.username = localStorage.getItem('username') || '';

    if (value.role.length === 0 || value.username.length === 0) {
      return true;
    } else {
      switch (value.role) {
        case 'Mozo':
          return this.router.navigate(['/waitress']).then(() => false);
        case 'Cocinero':
          return this.router.navigate(['/cocina']).then(() => false);
        case 'Admin':
          return this.router.navigate(['/admin']).then(() => false);
      }
      return true;
    }
  }
}

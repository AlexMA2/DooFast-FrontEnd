import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private data$!: Observable<User>;
  user!: User;
  logged: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.data$ = this.auth.getUser;
    this.data$.subscribe((data) => {
      this.user = data;
      this.logged = true;
    });
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
    this.auth.logout();
    this.user.role = '';
    this.user.username = '';
    this.logged = false;
    localStorage.clear();
  }
}

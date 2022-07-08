import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private data$!: Observable<string>;
  user: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.data$ = this.auth.getUserRole;
    this.data$.subscribe((data) => (this.user = data));
  }
}

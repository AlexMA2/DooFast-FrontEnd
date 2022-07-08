import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'DooFast';
  showModal = false;
  isConnected: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.login('', '').subscribe(
      (data) => {
        this.isConnected = true;
      },
      (error) => {
        this.isConnected = false;
        this.showModal = true;
      }
    );
  }

  noShowModal() {
    this.showModal = false;
  }
}

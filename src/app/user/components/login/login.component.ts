import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formLogin = formBuilder.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  Login() {
    console.log(
      'HOLA',
      this.formLogin.get('correo')?.value,
      this.formLogin.get('password')?.value
    );
    this.authService
      .login(
        this.formLogin.get('correo')?.value,
        this.formLogin.get('password')?.value
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          switch (data[0].rol) {
            case 'Administrador':
              this.router.navigate(['admin']);
              break;
            case 'Mozo':
              this.router.navigate(['waitress']);
              break;
            case 'Cocina':
              this.router.navigate(['cocina']);
              break;
          }
        },
        (error) => {}
      );
  }
}

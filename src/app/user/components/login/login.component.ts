import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formLogin!: FormGroup;

  valids: any = {
    correo: false,
    password: false,
  };

  constructor(
    formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formLogin = formBuilder.group({
      correo: ['', Validators.email],
      password: ['', Validators.minLength(8)],
    });
  }

  validateInput(field: string) {
    this.valids[field] =
      this.formLogin.get(field)?.value.length &&
      this.formLogin.get(field)?.invalid &&
      (this.formLogin.get(field)?.dirty || this.formLogin.get(field)?.touched);
  }

  Login() {
    if (!this.formLogin.invalid) {
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
          (error) => {
            alert(error.error.message);
          }
        );
    }
  }
}

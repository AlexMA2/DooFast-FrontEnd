import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private _snackBar: MatSnackBar
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
            if (!data[0]) {
              this._snackBar.open(
                'Usuario no encontrado. Compruebe los datos introducidos.',
                'Cerrar',
                {
                  duration: 3000,
                }
              );
              return;
            }
            switch (data[0].role) {
              case 'Administrador':
                this.authService.setUser = {
                  role: 'Administrador',
                  username: data[0].username,
                };
                this.router.navigate(['/admin']);
                break;
              case 'Mozo':
                this.authService.setUser = {
                  role: 'Mozo',
                  username: data[0].username,
                };
                this.router.navigate(['/waitress']);
                break;
              case 'Cocina':
                this.authService.setUser = {
                  role: 'Cocina',
                  username: data[0].username,
                };

                this.router.navigate(['/cocina']);
                break;
            }
          },
          (error) => {
            this._snackBar.open(error.name, 'Cerrar', {
              duration: 3000,
            });
          }
        );
    }
  }
}

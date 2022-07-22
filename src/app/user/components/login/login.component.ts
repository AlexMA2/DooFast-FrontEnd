import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  valids: any = {
    correo: false as Boolean,
    password: false as Boolean,
  };

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
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
              this.showSnackBar(
                'Usuario no encontrado. Compruebe los datos introducidos.'
              );
              return;
            }

            this.setPermissions(data[0].rol, data[0].nombreUsuario);
          },
          (error) => {
            this.showSnackBar(error.name);
          }
        );
    }
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  setPermissions(role: string, username: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);

    switch (role) {
      case 'Administrador':
        this.authService.setUser = {
          role,
          username,
        };
        this.router.navigate(['/admin']);
        break;
      case 'Mozo':
        this.authService.setUser = {
          role,
          username,
        };
        this.router.navigate(['/waitress']);
        break;
      case 'Cocina':
        this.authService.setUser = {
          role,
          username,
        };

        this.router.navigate(['/cocina']);
        break;
    }
  }
}

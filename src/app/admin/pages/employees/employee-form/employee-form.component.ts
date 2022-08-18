import { Component, OnInit, HostBinding } from '@angular/core';
import { UserData } from 'src/app/models/UserData';
import { UserDataService } from 'src/app/services/userData/user-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  employee: UserData = {
    idUsuario: 0,
    nombreLocal: '',
    nombreRol: '',
    usuario: '',
    nombreUsuario: '',
    contrasenia: '',
    nroCelular: '',
    correoElectronico: '',
    fechaCreacion: '',
    ultimoLogin: '',
  };

  encryptedPassword: string = '';
  edit: boolean = false;

  editUserParameters: any = {
    Administrador: {
      idRol: 1,
      link: '/admin/employees',
    },
    Mozo: {
      idRol: 2,
      link: '/admin/employees',
    },
    Cocina: {
      idRol: 3,
      link: '/admin/employees',
    },
  };

  constructor(
    private userDataService: UserDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.idUsuario) {
      this.userDataService.getUser(params.idUsuario).subscribe(
        (res) => {
          this.encryptedPassword = res.contrasenia;
          res.contrasenia = '';
          this.employee = res;
          this.edit = true;
        },
        (err) => console.log(err)
      );
    }
  }

  saveNewUser() {
    const userParameters = this.editUserParameters[this.employee.nombreRol];

    if (userParameters) {
      this.userDataService
        .addUser(
          this.employee.usuario,
          this.employee.nombreUsuario,
          this.employee.contrasenia,
          this.employee.nroCelular,
          this.employee.correoElectronico,
          1,
          userParameters.idRol
        )
        .subscribe(() => {
          this.router.navigate([userParameters.link]);
        });
    }
  }

  updateUser() {
    const userParameters = this.editUserParameters[this.employee.nombreRol];
    const newPassword =
      this.employee.contrasenia === ''
        ? this.encryptedPassword
        : this.employee.contrasenia;
    if (userParameters) {
      this.userDataService
        .updateUser(
          this.employee.idUsuario,
          this.employee.usuario,
          this.employee.nombreUsuario,
          newPassword,
          this.employee.nroCelular,
          this.employee.correoElectronico,
          1,
          userParameters.idRol
        )
        .subscribe(() => {
          this.router.navigate([userParameters.link]);
        });
    }
  }
}

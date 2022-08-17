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

  edit: boolean = false;

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
          console.log(res);
          this.employee = res;
          this.edit = true;
        },
        (err) => console.log(err)
      );
    }
  }

  saveNewUser() {
    switch (this.employee.nombreRol) {
      case 'Administrador':
        this.userDataService
          .addUser(
            this.employee.usuario,
            this.employee.nombreUsuario,
            this.employee.contrasenia,
            this.employee.nroCelular,
            this.employee.correoElectronico,
            1,
            1
          )
          .subscribe(
            (res) => {
              this.router.navigate(['/admin/employees']);
            },
            (err) => console.error(err)
          );

        break;
      case 'Mozo':
        this.userDataService
          .addUser(
            this.employee.usuario,
            this.employee.nombreUsuario,
            this.employee.contrasenia,
            this.employee.nroCelular,
            this.employee.correoElectronico,
            1,
            2
          )
          .subscribe(
            (res) => {
              this.router.navigate(['/admin/employees']);
            },
            (err) => console.error(err)
          );

        break;
      case 'Cocina':
        this.userDataService
          .addUser(
            this.employee.usuario,
            this.employee.nombreUsuario,
            this.employee.contrasenia,
            this.employee.nroCelular,
            this.employee.correoElectronico,
            1,
            3
          )

          .subscribe(
            (res) => {
              this.router.navigate(['/admin/employees']);
            },
            (err) => console.error(err)
          );

        break;
    }
  }

  updateUser() {
    switch (this.employee.nombreRol) {
      case 'Administrador':
        this.userDataService
          .updateUser(
            this.employee.idUsuario,
            this.employee.usuario,
            this.employee.nombreUsuario,
            this.employee.contrasenia,
            this.employee.nroCelular,
            this.employee.correoElectronico,
            1,
            1
          )
          .subscribe(
            (res) => {
              console.log(res);
              this.router.navigate(['/admin/employees']);
            },
            (err) => console.error(err)
          );

        break;
      case 'Mozo':
        this.userDataService
          .updateUser(
            this.employee.idUsuario,
            this.employee.usuario,
            this.employee.nombreUsuario,
            this.employee.contrasenia,
            this.employee.nroCelular,
            this.employee.correoElectronico,
            1,
            2
          )
          .subscribe(
            (res) => {
              console.log(res);
              this.router.navigate(['/admin/employees']);
            },
            (err) => console.error(err)
          );

        break;
      case 'Cocina':
        this.userDataService
          .updateUser(
            this.employee.idUsuario,
            this.employee.usuario,
            this.employee.nombreUsuario,
            this.employee.contrasenia,
            this.employee.nroCelular,
            this.employee.correoElectronico,
            1,
            3
          )
          .subscribe(
            (res) => {
              console.log(res);
              this.router.navigate(['/admin/employees']);
            },
            (err) => console.error(err)
          );

        break;
    }
  }
}

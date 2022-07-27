import { Component, OnInit, HostBinding } from '@angular/core';
import { UserData } from 'src/app/models/UserData';
import { UserDataService } from 'src/app/services/userData/user-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
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
  }
  
  constructor(
    private userDataService: UserDataService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  saveNewUser() {
    switch (this.employee.nombreRol) {
      case 'Administrador':
        this.userDataService.addUser(this.employee.usuario, this.employee.nombreUsuario, 
          this.employee.contrasenia, this.employee.nroCelular, this.employee.correoElectronico, 1, 1)
          .subscribe(
            res => {
              console.log(res);
              this.router.navigate(['/admin/employees']);
            },
            err => console.error(err)
          )

        break;
      case 'Mozo':
        this.userDataService.addUser(this.employee.usuario, this.employee.nombreUsuario, 
          this.employee.contrasenia, this.employee.nroCelular, this.employee.correoElectronico, 1, 2)
          .subscribe(
            res => {
              console.log(res);
              this.router.navigate(['/admin/employees']);
            },
            err => console.error(err)
          )

        break;
      case 'Cocinero':
        this.userDataService.addUser(this.employee.usuario, this.employee.nombreUsuario, 
          this.employee.contrasenia, this.employee.nroCelular, this.employee.correoElectronico, 1, 3)
          .subscribe(
            res => {
              console.log(res);
              this.router.navigate(['/admin/employees']);
            },
            err => console.error(err)
          )

        break;
    }
  }

}

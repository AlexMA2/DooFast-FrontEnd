import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserData } from 'src/app/models/UserData';
import { UserDataService } from 'src/app/services/userData/user-data.service';
import { MatButtonModule } from '@angular/material/button';

/*const ELEMENT_DATA: UserData[] = [
  {idUsuario: 1, nombreUsuario: 'Joel', nroCelular: '1111', correo: 'gmail', rol: 'mesero', idRestaurante: 1},
  {idUsuario: 2, nombreUsuario: 'Fernanda', nroCelular: '1111', correo: 'gmail', rol: 'mesero', idRestaurante: 1},
  {idUsuario: 3, nombreUsuario: 'Josue', nroCelular: '1111', correo: 'gmail', rol: 'cocinero', idRestaurante: 1},
];*/

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource: UserData[] = [];

  constructor(
    private userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['idUsuario', 'nombreUsuario', 'nroCelular', 
    'correo', 'rol', 'local', 'delete'];
    this.getAllUsers();
  }

  getAllUsers() {
    this.userDataService.getAllUsers()
      .subscribe(
        res => {
          this.dataSource = res;
        },
        err => console.error(err)
      );
  }

  deleteProduct(u: UserData) {
    this.userDataService.deleteUser(u.idUsuario).subscribe((data) => {
      console.log(data);
      this.getAllUsers();
    });
  }

}

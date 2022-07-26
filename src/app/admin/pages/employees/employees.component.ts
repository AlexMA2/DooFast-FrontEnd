import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserData } from 'src/app/models/UserData';

const ELEMENT_DATA: UserData[] = [
  {idUsuario: 1, nombreUsuario: 'Joel', nroCelular: '1111', correo: 'gmail', rol: 'mesero', idRestaurante: 1},
  {idUsuario: 2, nombreUsuario: 'Fernanda', nroCelular: '1111', correo: 'gmail', rol: 'mesero', idRestaurante: 1},
  {idUsuario: 3, nombreUsuario: 'Josue', nroCelular: '1111', correo: 'gmail', rol: 'cocinero', idRestaurante: 1},
];

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = ['idUsuario', 'nombreUsuario', 'nroCelular', 'correo', 'rol', 'idRestaurante'];
  }

}

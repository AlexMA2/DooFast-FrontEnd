import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/UserData';
import { UserDataService } from 'src/app/services/userData/user-data.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: UserData[] = [];

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.displayedColumns = [
      'idUsuario',
      'nombreUsuario',
      'nroCelular',
      'correo',
      'rol',
      'local',
      'update',
      'delete',
    ];
    this.getAllUsers();
  }

  getAllUsers() {
    this.userDataService.getAllUsers().subscribe(
      (res) => {
        this.dataSource = res;
      },
      (err) => console.error(err)
    );
  }

  deleteProduct(u: UserData) {
    this.userDataService.deleteUser(u.idUsuario).subscribe((data) => {
      this.getAllUsers();
    });
  }
}

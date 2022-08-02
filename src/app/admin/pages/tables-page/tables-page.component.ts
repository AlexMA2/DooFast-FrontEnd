import { Component, OnInit } from '@angular/core';
import { PostTable, PutTable, Table } from 'src/app/models/Table';
import { TableService } from 'src/app/services/table/table.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.css']
})
export class TablesPageComponent implements OnInit {

  // date: Date = new Date();
  numberTables: number = 0;
  tables: Table[] = [];
  postTable: PostTable = {
    nroMesa: 0,
    idRestaurante: 1,
  };
  llamados: number = 0;

  constructor(
    private tablesServices: TableService
  ) { }

  ngOnChanges() {
    this.getTables();
  }

  ngOnInit(): void {
    this.getTables();
  }

  addTable() {
    this.tablesServices.addTable(this.postTable).subscribe(
      (data) => {
        this.getTables();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se agregó la mesa correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },
    );
  }

  getTables() {
    this.tablesServices.getAllTables().subscribe(
      (data) => {
        this.tables = data;
        this.numberTables = data.length;
        this.postTable.nroMesa = this.numberTables + 1;
        console.log("tables: ", this.numberTables);
        console.log(data);
      },
    );
    this.llamados = this.llamados + 1;
    console.log("llamados: ", this.llamados);
  }

  deleteButton(tableNumber: number) {
    Swal.fire({
      title: '¿Seguro que quieres eliminar la mesa?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarla!'
    }).then((result) => {
      if (result.value) {
        this.deleteTable(tableNumber);
      }
    })
  }

  deleteTable(tableNumber: number) {
    this.tablesServices.deleteTable(tableNumber).subscribe(
      (data) => {
        this.getTables();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se eliminó la mesa correctamente',
          showConfirmButton: false,
          timer: 1500
        });        
        // TODO: Define what to do with the other tables when this is deleted (move them to the previous number?)
        // TODO: Define what to do with the add button after this is deleted (Fill the empty space?)
      },
      (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No se pudo eliminar la mesa',
          showConfirmButton: false,
          timer: 1500
        })
      }
    );
  }

  editTable(table: Table) {
    this.postTable.nroMesa = table.nroMesa;
    this.postTable.idRestaurante = table.IdRestaurante;
  }
}

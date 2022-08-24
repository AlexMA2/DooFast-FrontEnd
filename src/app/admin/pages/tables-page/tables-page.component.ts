import { Component, OnInit } from '@angular/core';
import { PostTable, Table } from 'src/app/models/Table';
import { TableService } from 'src/app/services/table/table.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.css'],
})
export class TablesPageComponent implements OnInit {
  numberTables: number = 0;
  tables: Table[] = [];
  postTable: PostTable = {
    nroMesa: 0,
    idRestaurante: 1,
    nroAsientos: 0,
  };
  llamados: number = 0;

  constructor(private tablesServices: TableService) {}

  ngOnChanges() {
    this.getTables();
  }

  ngOnInit(): void {
    this.getTables();
  }

  addTableButton() {
    Swal.fire({
      title: 'Ingresa el número de asientos',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      showLoaderOnConfirm: true,
      preConfirm: (nroAsientos) => {
        console.log(nroAsientos);
        return this.addTable(nroAsientos);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se agregó la mesa correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No se pudo agregar la mesa',
        });
      }
    });
  }

  addTable(nroAsientos: number = 1) {
    console.log(nroAsientos);
    this.tablesServices.addTable(nroAsientos).subscribe((data) => {
      this.getTables();
      console.log(data);
      return true;
    });
  }

  getTables() {
    this.tablesServices.getAllTables().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].nroMesa = i + 1;
      }

      this.tables = data;
    });
  }

  editTable(table: Table) {
    this.postTable.nroMesa = table.nroMesa;
    this.postTable.idRestaurante = table.IdRestaurante;
  }
}

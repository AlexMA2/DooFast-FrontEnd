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
      title: 'Ingresa el número de mesa',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      showLoaderOnConfirm: true,
      preConfirm: (idMesa) => {
        return this.addTable(idMesa);
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

  addTable(id: number) {
    this.postTable.nroMesa = id;
    this.tablesServices.addTable(this.postTable).subscribe((data) => {
      this.getTables();
      return true;
    });
  }

  getTables() {
    this.tablesServices.getAllTables().subscribe((data) => {
      this.tables = data;
      this.numberTables = data.length;
      this.postTable.nroMesa = this.numberTables + 1;
    });
    this.llamados = this.llamados + 1;
  }

  editTable(table: Table) {
    this.postTable.nroMesa = table.nroMesa;
    this.postTable.idRestaurante = table.IdRestaurante;
  }
}

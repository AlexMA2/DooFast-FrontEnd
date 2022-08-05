import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'src/app/models/Table';
import { OrderService } from 'src/app/services/order/order.service';
import { TableService } from 'src/app/services/table/table.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  tableState: string = 'Vacío';
  @Input() table!: Table;
  @Output() updateTableState = new EventEmitter<any>();

  constructor(private tableService: TableService, private router: Router) { }
  ngOnInit(): void {
    switch (this.table.estadoMesa) {
      case 'VACIO':
        this.tableState = 'Vacío';
        break;
      case 'EN ESPERA':
        this.tableState = 'En espera';
        break;
      default:
        this.tableState = 'Vacío';
        break;
    }
  }

  deleteTable() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.value) {
        this.tableService.deleteTable(this.table.idMesa).subscribe(
          (data) => {
            this.updateTableState.emit();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Se eliminó la mesa correctamente',
              showConfirmButton: false,
              timer: 1500
            });        
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
    })
  }
}
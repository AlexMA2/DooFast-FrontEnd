import { ArrayDataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';

export interface Food {
  idComida: number;
  nombreCategoria: string;
  nombreComida: string;
  precio: number;
  costo: number;
  fechaCreacion: Date;
}

const ELEMENT_DATA: Food[] = [
  {
    idComida: 1,
    nombreCategoria: 'Principal',
    nombreComida: 'Arroz con Pollo',
    precio: 5.0,
    costo: 3.0,
    fechaCreacion: new Date(),
  },
];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  displayedColumns: string[] = Object.keys(ELEMENT_DATA[0]);
  dataSource = ELEMENT_DATA;
  constructor() {}

  ngOnInit(): void {
    console.log(this.displayedColumns);
  }
}

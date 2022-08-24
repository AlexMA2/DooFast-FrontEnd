export interface Table {
  idMesa: number;
  nroAsientos: number;
  estadoMesa: string;
  nroMesa: number;
  IdRestaurante: number;
}

export interface PutTable {
  estadoMesa: string;
  idMesa: number;
  nroAsientos: number;
}

export interface PostTable {
  nroMesa: number;
  idRestaurante: number;
  nroAsientos: number;
}

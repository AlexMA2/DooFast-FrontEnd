export interface Table {
  idMesa: number;
  estadoMesa: string;
  nroMesa: number;
  IdRestaurante: number;
}

export interface PutTable {
  estadoMesa: string;
  nroMesa: number;
  IdRestaurante: number;
}

export interface PostTable {
  nroMesa: number;
  idRestaurante: number;
}

export interface Order {
  idMesa: number;
  idComida: number;
  cantidad: number;
}

export interface OrderData {
  idOrden: number | null;
  idMesa: number;
  idComida: number;
  nombreComida: string;
  nombreCategoria: string;
  precio: number | null;
  cantidad: number | 0;
  fechaCreacion: Date | null;
  estadoOrden: string | null;
  saved: boolean;
}

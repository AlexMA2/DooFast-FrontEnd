export interface Order {
  idMesa: number;
  idComida: number;
  cantidad: number;
}

export interface OrderData {
  idMesa: number;
  nombreCategoria: string;
  nombreComida: string;
  idOrden: number | null;
  idPedido: string;
  precio: number | null;
  fechaCreacion: Date | null;
  cantidad: number | 0;
  idComida: number;
  estadoOrden: string | null;
  saved: boolean;
}

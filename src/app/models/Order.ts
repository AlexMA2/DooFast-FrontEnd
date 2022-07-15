export interface Order {
  idMesa: number;
  idComida: number;
  cantidad: number;
}

export class OrderData {
  idOrden: number | null = null;
  idMesa: number = 1;
  idComida: number = 1;
  nombreComida: string = '';
  nombreCategoria: string = 'Entrada';
  idPedido: string | null = 'A05';
  precio: number | null = 0;
  cantidad: number = 0;
  fechaCreacion: Date = new Date();
  estadoOrden: string | null = null;
  saved: boolean = false;
  imagen: string | null = null;
}

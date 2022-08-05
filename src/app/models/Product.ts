export interface Product {
  idComida: number;
  nombreComida: string;
  precio: number;
  costo: number;
  imagen: string | null;
  nombreCategoria: string;
  fechaCreacion: Date;
}

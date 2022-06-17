interface Pedido {
    idProducto: number;
    cantidad: number;
}

export interface Order {
    idMesa: number;
    pedidos: Pedido[];
}
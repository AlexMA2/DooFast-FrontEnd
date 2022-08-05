import { OrderData } from 'src/app/models/Order';

export function loadOrders(orders: OrderData[]) {
  let ordersList: any = {
    Entrada: [] as OrderData[],
    Principal: [] as OrderData[],
    Bebida: [] as OrderData[],
    Postre: [] as OrderData[],
  };

  if (orders && orders.length > 0) {
    for (let order of orders) {
      const category = order.nombreCategoria;
      order.saved = true;
      for (let i = 0; i < order.cantidad; i++) {
        ordersList[category].push(order);
      }
    }
  }

  return ordersList;
}

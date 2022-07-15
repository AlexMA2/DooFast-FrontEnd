import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { OrderService } from './order.service';
import { Order, OrderData } from 'src/app/models/Order';
import { asyncData } from '../asyncData';

describe('OrderService', () => {
  let service: OrderService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new OrderService(httpClientSpy);
  });

  it('should return expected response (HttpClient called once)', (done: DoneFn) => {
    const expectedResponse: OrderData[] = [
      {
        idOrden: null,
        idMesa: 1,
        idComida: 1,
        nombreComida: '',
        nombreCategoria: 'Entrada',
        idPedido: 'A05',
        precio: 0,
        cantidad: 0,
        fechaCreacion: new Date(),
        estadoOrden: null,
        saved: false,
        imagen: null,
      },
    ];

    httpClientSpy.get.and.returnValue(asyncData(expectedResponse));

    service.getAllOrders().subscribe({
      next: (res) => {
        expect(res).withContext('expected heroes').toEqual(expectedResponse);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});

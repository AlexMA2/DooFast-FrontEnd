import { Component, ViewChild, OnInit } from '@angular/core';
import { OrdersHistoryService } from 'src/app/services/orders-history/orders-history.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TopProductFake } from '../../utils/topProducts_fake';
import { EconomicData } from 'src/app/models/EconomicData';
import { HistoryProduct } from 'src/app/models/HistoryProduct';

interface MonthName {
  value: number;
  name: string;
}

interface TopProductsCategory {
  category: string;
  products: MatTableDataSource<HistoryProduct>;
}

@Component({
  selector: 'app-economy',
  templateUrl: './economy.component.html',
  styleUrls: ['./economy.component.css'],
})
export class EconomyComponent implements OnInit {
  constructor(private orderHistoryService: OrdersHistoryService) {}

  year = new Date().getFullYear();
  month = new Date().getMonth() + 1;
  displayedColumns: string[] = [
    'idHistorialPedido',
    'nombreComida',
    'cantidad',
  ];

  foodsDataSource = [] as TopProductsCategory[];

  maxMonth: number = 12;
  @ViewChild(MatSort) sort!: MatSort;
  monthNames: MonthName[] = [
    { value: 1, name: 'Enero' },
    { value: 2, name: 'Febrero' },
    { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Mayo' },
    { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' },
    { value: 11, name: 'Noviembre' },
    { value: 12, name: 'Diciembre' },
  ];

  // options

  barVerticalChartOptions = {
    xAxisLabel: 'Meses',
    yAxisLabel: 'Ingresos y Pedidos',
    legendTitle: 'Ingresos y Pedidos en el año',
  };

  lineChartOptions = {
    xAxisLabel: 'Dias',
    yAxisLabel: 'Ingresos y Pedidos',
    legendTitle: 'Ingresos y Pedidos en el mes',
  };

  dataChart: any[] = [];
  lineChartData: any[] = [];

  ngOnInit(): void {
    this.getDataForYear(this.year);
    if (this.year === new Date().getFullYear()) {
      this.maxMonth = new Date().getMonth() + 1;
    }

    this.getHistoryProducts();
  }

  onYearChanges() {
    let actualYear = new Date().getFullYear();
    if (this.year > actualYear) {
      this.year = actualYear;
    }
    if (this.year !== actualYear) {
      this.maxMonth = 12;
    }
    if (this.year === actualYear) {
      this.maxMonth = new Date().getMonth() + 1;
      this.month = this.maxMonth;
    }
    this.getDataForYear(this.year);
  }

  onMonthChanges(ev: any) {
    let actualMonth = new Date().getMonth() + 1;
    if (this.month > actualMonth) {
      this.month = actualMonth;
    }
  }

  generateDataChart(year: number, values: any[]) {
    this.dataChart = [];
    let maxMonth: number = 11;
    if (year === new Date().getFullYear()) {
      maxMonth = new Date().getMonth();
    }
    for (let i = 0; i <= maxMonth; i++) {
      this.dataChart.push({
        name: this.monthNames[i].name,
        series: [
          {
            name: 'Ingresos S/.',
            value: values[i][0],
          },
          {
            name: 'Pedidos',
            value: values[i][1],
          },
        ],
      });
    }
  }

  getDataForYear(anio: number) {
    this.orderHistoryService.getDataForYear(anio).subscribe(
      (data) => {
        this.transformDataForYear(anio, data);
      },
      () => {
        this.generateRandomValues(1);
      }
    );
  }

  transformDataForYear(anio: number, data: EconomicData[]) {
    let arrayData: number[][] = [];
    for (let i = 0; i < 12; i++) {
      arrayData.push([0, 0]);
    }
    for (let value of data) {
      arrayData[value.mes - 1] = [value.TotalMes, value.CantidadPedidos];
    }

    this.generateDataChart(anio, arrayData);
  }

  getHistoryProducts() {
    this.orderHistoryService.getHistoryProducts().subscribe(
      (data) => {
        this.foodsDataSource.push({
          category: 'Entradas',
          products: new MatTableDataSource(data[0]),
        });
        this.foodsDataSource.push({
          category: 'Platos Principales',
          products: new MatTableDataSource(data[1]),
        });
        this.foodsDataSource.push({
          category: 'Bebidas',
          products: new MatTableDataSource(data[2]),
        });
        this.foodsDataSource.push({
          category: 'Postres',
          products: new MatTableDataSource(data[3]),
        });
      },
      () => {
        this.foodsDataSource.push({
          category: 'Entradas',
          products: new MatTableDataSource(TopProductFake[0]),
        });
        this.foodsDataSource.push({
          category: 'Platos Principales',
          products: new MatTableDataSource(TopProductFake[1]),
        });
        this.foodsDataSource.push({
          category: 'Bebidas',
          products: new MatTableDataSource(TopProductFake[2]),
        });
        this.foodsDataSource.push({
          category: 'Postres',
          products: new MatTableDataSource(TopProductFake[3]),
        });
      }
    );
  }

  generateRandomValues(type: number) {
    let info: any[] = [];

    for (let i = 0; i < 31; i++) {
      info.push([
        Math.floor(Math.random() * 300) + 10,
        Math.floor(Math.random() * 100) + 10,
      ]);
    }

    if (type === 1) {
      this.generateDataChart(this.year, info);
    }
  }
}

import { Component, ViewChild, OnInit } from '@angular/core';
import { OrdersHistoryService } from 'src/app/services/orders-history/orders-history.service';
import { MatSort, Sort } from '@angular/material/sort';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import { TopProduct } from 'src/app/models/TopProduct';
import { TopProductFake } from '../../utils/topProducts_fake';

interface MonthName {
  value: number;
  name: string;
}

const ELEMENT_DATA: TopProduct[] = [
  { position: 1, nombreComida: 'Producto 1', cantidad: 100 },
  { position: 2, nombreComida: 'Producto 2', cantidad: 90 },
  { position: 3, nombreComida: 'Producto 3', cantidad: 80 },
  { position: 4, nombreComida: 'Producto 4', cantidad: 60 },
  { position: 5, nombreComida: 'Producto 5', cantidad: 50 },
  { position: 6, nombreComida: 'Producto 6', cantidad: 30 },
  { position: 7, nombreComida: 'Producto 7', cantidad: 25 },
  { position: 8, nombreComida: 'Producto 8', cantidad: 18 },
];

@Component({
  selector: 'app-economy',
  templateUrl: './economy.component.html',
  styleUrls: ['./economy.component.css'],
})
export class EconomyComponent implements OnInit {
  constructor(private orderHistoryService: OrdersHistoryService) {}

  year = new Date().getFullYear();
  month = new Date().getMonth() + 1;
  displayedColumns: string[] = ['position', 'nombreComida', 'cantidad'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  foodsDataSource = {
    starters: new MatTableDataSource(
      ELEMENT_DATA
    ) as MatTableDataSource<TopProduct>,
    dishes: new MatTableDataSource(
      ELEMENT_DATA
    ) as MatTableDataSource<TopProduct>,
    drinks: new MatTableDataSource(
      ELEMENT_DATA
    ) as MatTableDataSource<TopProduct>,
    desserts: new MatTableDataSource(
      ELEMENT_DATA
    ) as MatTableDataSource<TopProduct>,
  };

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
    this.getDataForMonth(this.month);
    if (this.year === new Date().getFullYear()) {
      this.maxMonth = new Date().getMonth() + 1;
    }

    this.getHistoryProducts();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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

  select(ev: any) {
    let actualMonth = new Date().getMonth() + 1;
    if (this.month > actualMonth) {
      this.month = actualMonth;
    }
    this.getDataForMonth(ev);
  }

  onSelect(data: any): void {}

  onActivate(data: any): void {}

  onDeactivate(data: any): void {}

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

  generateLineChartData(month: number, values: any[]) {
    this.lineChartData = [];
    let maxDayPerMonth: any = {
      1: 31,
      2: 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31,
    };
    let maxDay = maxDayPerMonth[month];

    let seriesIngresos = [];
    let seriesPedidos = [];
    for (let i = 0; i < maxDay; i++) {
      seriesIngresos.push({
        name: i + 1,
        value: values[i][0],
      });
      seriesPedidos.push({
        name: i + 1,
        value: values[i][1],
      });
    }

    this.lineChartData = [
      {
        name: 'Ingresos S/.',
        series: seriesIngresos,
      },
      {
        name: 'Pedidos',
        series: seriesPedidos,
      },
    ];
  }

  getDataForYear(anio: number) {
    this.orderHistoryService.getDataForYear(anio).subscribe(
      (data) => {
        this.generateDataChart(anio, data);
      },
      () => {
        this.generateRandomValues(1);
      }
    );
  }

  getDataForMonth(month: number) {
    this.orderHistoryService.getDataForMonth(month).subscribe(
      (data) => {
        this.generateLineChartData(month, data);
      },
      () => {
        this.generateRandomValues(2);
      }
    );
  }

  getHistoryProducts() {
    this.orderHistoryService.getHistoryProducts().subscribe(
      (data) => {
        this.foodsDataSource.starters = new MatTableDataSource(data[0]);
        this.foodsDataSource.dishes = new MatTableDataSource(data[1]);
        this.foodsDataSource.drinks = new MatTableDataSource(data[2]);
        this.foodsDataSource.desserts = new MatTableDataSource(data[3]);
      },
      () => {
        this.foodsDataSource.starters = new MatTableDataSource(
          TopProductFake[0]
        );
        this.foodsDataSource.dishes = new MatTableDataSource(TopProductFake[1]);
        this.foodsDataSource.drinks = new MatTableDataSource(TopProductFake[2]);
        this.foodsDataSource.desserts = new MatTableDataSource(
          TopProductFake[3]
        );
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
    } else if (type === 2) {
      this.generateLineChartData(this.month, info);
    }
  }
}

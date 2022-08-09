import { Component, OnInit } from '@angular/core';
import { OrdersHistoryService } from 'src/app/services/orders-history/orders-history.service';

interface MonthName {
  value: number;
  name: string;
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

  maxMonth: number = 12;

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
    this.generateRandomValues(1);
    this.generateRandomValues(2);
    if (this.year === new Date().getFullYear()) {
      this.maxMonth = new Date().getMonth() + 1;
    }
  }

  onYearChanges() {
    let actualYear = new Date().getFullYear();
    if (this.year > actualYear) {
      this.year = actualYear;
    }
    if (this.year !== actualYear) {
      this.maxMonth = 12;
    }
    this.getDataForYear(this.year);
  }

  select(ev: any) {
    console.log('select', ev);
    let actualMonth = new Date().getMonth() + 1;
    if (this.month > actualMonth) {
      console.log('MAYOR', this.month, actualMonth);
      this.month = actualMonth;
    }
    this.getDataForMonth(ev);
  }

  onSelect(data: any): void {}

  onActivate(data: any): void {}

  onDeactivate(data: any): void {}

  generateDataChart(year: number, values: any[]) {
    console.log('GENERATING DATA CHART', year);
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
      (error) => {
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

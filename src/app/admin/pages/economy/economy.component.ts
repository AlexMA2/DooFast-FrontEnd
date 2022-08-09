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
    this.generateRandomValues();
  }

  onYearChanges() {
    this.getDataForYear(this.year);
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  generateDataChart(year: number, values: any[]) {
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
        console.log('error');
      }
    );
  }

  getDataForMonth(month: number) {
    this.orderHistoryService.getDataForMonth(month).subscribe(
      (data) => {
        this.generateLineChartData(month, data);
      },
      () => {
        console.log('error');
      }
    );
  }

  generateRandomValues() {
    let info = [];
    for (let i = 0; i < 32; i++) {
      info.push([
        Math.floor(Math.random() * 300) + 10,
        Math.floor(Math.random() * 100) + 10,
      ]);
    }
    this.generateDataChart(this.year, info);
    this.generateLineChartData(this.month, info);
  }
}

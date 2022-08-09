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

  dataChart = [] as any[];

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Meses';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Valores';
  legendTitle: string = 'Ingresos y Pedidos por mes';

  colorScheme = '#5AA454';

  ngOnInit(): void {
    this.getDataForYear(this.year);
  }

  onYearChanges() {
    this.getDataForYear(this.year);
  }

  generateDataChart(values: any[]) {
    let actualMonth: number = new Date().getMonth();

    for (let i = 0; i <= actualMonth; i++) {
      this.dataChart.push({
        name: this.monthNames[i].name,
        series: [
          {
            name: 'Ingresos',
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

  getDataForYear(year: number) {
    this.orderHistoryService.getDataForYear(year).subscribe(
      (data) => {
        this.generateDataChart(data);
      },
      () => {
        let info = [];
        for (let i = 0; i < 12; i++) {
          info.push([
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 750),
          ]);
        }
        console.log(info);
      }
    );
  }
}

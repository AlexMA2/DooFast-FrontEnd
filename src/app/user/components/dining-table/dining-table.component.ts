import { Component, OnInit } from '@angular/core';
import { EMPTY, UNATTENDED, WAITING, SERVED } from '../../constants/dining-table-states'

interface Order {
  id: number;
  table: number;
  starter: string;
  maindish: string; 
  dessert: string;
  drink: string;
}

@Component({
  selector: 'app-dining-table',
  templateUrl: './dining-table.component.html',
  styleUrls: ['./dining-table.component.css']
})
export class DiningTableComponent implements OnInit {

  WAITING = WAITING; // Angular cannot use the imported constants from constants.ts in HTML
  number : number = 1;
  state : string = EMPTY;
  time: number = 0
  orders?: Order[] = [];
   
  display : string = "00m 00s "
  interval : any;

 startTimer() {
    console.log("=====>");
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      this.display=this.transform( this.time)
    }, 1000);
  }
  transform(value: number): string {
       const minutes: number = Math.floor(value / 60);
       return minutes + 'm ' + (value - minutes * 60) + 's';
  }
  pauseTimer() {
    clearInterval(this.interval);
  }

  constructor() { }

  ngOnInit(): void {
    
  }
}

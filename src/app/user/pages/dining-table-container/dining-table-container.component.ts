import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dining-table-container',
  templateUrl: './dining-table-container.component.html',
  styleUrls: ['./dining-table-container.component.css']
})
export class DiningTableContainerComponent implements OnInit {

 
  diningTableAmount: number = 10

  constructor() { }

  ngOnInit(): void {
  }

}

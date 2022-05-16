import { Component, OnInit } from '@angular/core';
import { EMPTY, UNATTENDED, WAITING, SERVED } from '../../constants/dining-table-states'

@Component({
  selector: 'app-dining-table',
  templateUrl: './dining-table.component.html',
  styleUrls: ['./dining-table.component.css']
})
export class DiningTableComponent implements OnInit {

  number : number = 1;
  state : string = EMPTY;

  constructor() { }

  ngOnInit(): void {
  }

}

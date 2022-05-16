import { Component, OnInit } from '@angular/core';
import { UNATTENDED, WAITING, SERVED } from '../../constants/dining-table-states'

@Component({
  selector: 'app-dining-table',
  templateUrl: './dining-table.component.html',
  styleUrls: ['./dining-table.component.css']
})
export class DiningTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

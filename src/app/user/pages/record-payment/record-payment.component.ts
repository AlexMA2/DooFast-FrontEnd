import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record-payment',
  templateUrl: './record-payment.component.html',
  styleUrls: ['./record-payment.component.css']
})
export class RecordPaymentComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  navigateWithState() {
    this.router.navigateByUrl('/123', { state: { hello: 'world' } });
  }

}

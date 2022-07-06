import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-disconnected-alert',
  templateUrl: './disconnected-alert.component.html',
  styleUrls: ['./disconnected-alert.component.css'],
})
export class DisconnectedAlertComponent implements OnInit {
  @Output() onClickEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.onClickEvent.emit();
  }
}

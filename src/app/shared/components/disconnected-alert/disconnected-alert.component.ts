import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-disconnected-alert',
  templateUrl: './disconnected-alert.component.html',
  styleUrls: ['./disconnected-alert.component.css'],
})
export class DisconnectedAlertComponent {
  @Output() onClickEvent = new EventEmitter<any>();

  onClick() {
    this.onClickEvent.emit();
  }
}

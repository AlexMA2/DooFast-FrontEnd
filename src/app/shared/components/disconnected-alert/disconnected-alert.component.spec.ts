import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectedAlertComponent } from './disconnected-alert.component';

describe('DisconnectedAlertComponent', () => {
  let component: DisconnectedAlertComponent;
  let fixture: ComponentFixture<DisconnectedAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisconnectedAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisconnectedAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

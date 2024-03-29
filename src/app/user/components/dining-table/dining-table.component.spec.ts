import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningTableComponent } from './dining-table.component';

describe('DiningTableComponent', () => {
  let component: DiningTableComponent;
  let fixture: ComponentFixture<DiningTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiningTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiningTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('pause timer function should paus the timer', () => {
    component.startTimer();
    component.pauseTimer();
    expect(component.interval).toBe(undefined);
  });
});

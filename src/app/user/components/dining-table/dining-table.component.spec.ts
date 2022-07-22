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

  it('transform function should return a display of minutes and seconds', () => {
    const minutes: number = Math.floor(component.time / 60);
    const seconds: number = component.time - minutes * 60;
    const display: string = `${minutes}m ${seconds}s`;
    expect(component.transform(component.time)).toBe(display);
  });

  it('transform function should return a good sintaxis', () => {
    const num = 90;
    expect(component.transform(num)).toBe('1m 30s');
  });

  it('pause timer function should paus the timer', () => {
    component.startTimer();
    component.pauseTimer();
    expect(component.interval).toBe(undefined);
  });
});

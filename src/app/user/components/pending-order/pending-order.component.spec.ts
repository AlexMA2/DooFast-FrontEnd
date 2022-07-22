import { Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOrderComponent } from './pending-order.component';

describe('PendingOrderComponent', () => {
  let component: PendingOrderComponent;
  let fixture: ComponentFixture<PendingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PendingOrderComponent],
      providers: [Input],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});

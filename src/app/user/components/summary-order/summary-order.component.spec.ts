import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryOrderComponent } from './summary-order.component';

describe('SummaryOrderComponent', () => {
  let component: SummaryOrderComponent;
  let fixture: ComponentFixture<SummaryOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

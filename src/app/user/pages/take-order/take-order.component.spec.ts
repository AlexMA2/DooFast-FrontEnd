import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeOrderComponent } from './take-order.component';

describe('TakeOrderComponent', () => {
  let component: TakeOrderComponent;
  let fixture: ComponentFixture<TakeOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

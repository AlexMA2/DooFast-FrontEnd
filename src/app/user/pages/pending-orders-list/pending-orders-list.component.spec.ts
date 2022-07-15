import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOrdersListComponent } from './pending-orders-list.component';

describe('PendingOrdersListComponent', () => {
  let component: PendingOrdersListComponent;
  let fixture: ComponentFixture<PendingOrdersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PendingOrdersListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningTableContainerComponent } from './dining-table-container.component';

describe('DiningTableContainerComponent', () => {
  let component: DiningTableContainerComponent;
  let fixture: ComponentFixture<DiningTableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiningTableContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiningTableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

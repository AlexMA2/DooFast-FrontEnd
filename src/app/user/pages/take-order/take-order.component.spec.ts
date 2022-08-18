import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { TakeOrderComponent } from './take-order.component';

describe('TakeOrderComponent', () => {
  let component: TakeOrderComponent;
  let fixture: ComponentFixture<TakeOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserAnimationsModule, MatDialogModule],
      declarations: [TakeOrderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call openDialog', () => {
    const app = fixture.componentInstance;
    app.openDialog();
    fixture.detectChanges();
    const popUpHeader = document.getElementsByTagName(
      'h1'
    )[0] as HTMLHeadElement;
    expect(popUpHeader.innerText).toEqual(
      '¿Estás seguro de salir sin guardar?'
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

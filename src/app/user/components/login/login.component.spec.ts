import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { User, UserLogin } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { mockLocalStorage } from 'src/app/shared/utils/mockLocalStorage';
import { LoginComponent } from './login.component';

const mockedAuthService: {
  login: () => Observable<UserLogin>;
  setUser: () => void;
  getUser: () => Observable<User>;
} = {
  login: () =>
    of({
      correo: '',
      contrasenia: '',
    }),
  setUser: () => {},
  getUser: () =>
    of({
      role: '',
      username: '',
    }),
};

describe('Testing LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      declarations: [LoginComponent],
      providers: [{ provide: AuthService, useValue: mockedAuthService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with two fields', () => {
    const email = component.formLogin.controls['correo'].value;
    const password = component.formLogin.controls['password'].value;

    expect(email).toBe('');
    expect(password).toBe('');
  });

  it('validate function should set the correct boolean value in the respective key', () => {
    component.formLogin.controls['correo'].setValue('non-valid-email');
    component.formLogin.controls['password'].setValue('short');
    component.validateInput('correo');
    const emailIsValid = component.valids.correo;

    component.validateInput('password');
    const passwordIsValid = component.valids.password;
    expect(emailIsValid).toBeFalsy();
    expect(passwordIsValid).toBeFalsy();
  });

  it('show snackbar function should create an snacknar component', () => {
    component.showSnackBar('test');
    expect(component._snackBar).toBeTruthy();
  });

  it('set permissions function should store username and role in local storage and in the service', () => {
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);

    component.setPermissions('ADMINISTRADOR', 'Luis Martinez');
    expect(localStorage.getItem('username')).toEqual('Luis Martinez');
    expect(localStorage.getItem('role')).toEqual('ADMINISTRADOR');
  });

  // it('should call auth login method', () => {
  //   component.formLogin.controls['correo'].setValue('mamani.alex1@doofast.com');
  //   component.formLogin.controls['password'].setValue('1234567890');

  //   const role = 'ADMINISTRADOR';
  //   const username = 'Luis Martinez';

  //   const getUserSpy = spyOn(mockedAuthService, 'getUser');
  //   getUserSpy.and.returnValue(
  //     of({
  //       role,
  //       username,
  //     })
  //   );

  //   component.Login();
  //   expect(mockedAuthService.getUser).toHaveBeenCalledTimes(1);
  // });
});

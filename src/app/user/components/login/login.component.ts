import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  
  constructor(
    formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ){ 
    
   this.formLogin = formBuilder.group({
     correo: ['', Validators.required],
     password: ['', Validators.required]
   }) 
    
  }

  ngOnInit(): void {
  }

  Login(){
    console.log('login')

  }

}

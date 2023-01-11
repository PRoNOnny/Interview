import { Component, OnInit } from '@angular/core';
import { BackendService } from '../service/backend.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username : new FormControl(),
    password : new FormControl()
  })

  constructor(private backEnd : BackendService) { }

  ngOnInit(): void {
  }

  login(){
    this.backEnd.loginRequest(this.loginForm.get('username')!.value, this.loginForm.get('password')!.value)
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../models/credentials';
import { UserData } from '../models/UserData';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  credentials: Credentials = {
    email: '',
    password: ''
  };
  loginForm: FormGroup;
  registerInfo = '';
  registerError = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  register(values: Credentials): void {
    const email = values.email.trim();
    const password = values.password.trim();
    this.credentials = {
      email,
      password
    };
    this.authService.register(this.credentials)
      .then((data) => {
        console.log('in register - returned data:', data);
        this.registerInfo = 'Account was created, please log in';
        const user: UserData = {
          userId: data.user.uid,
          email: data.user.email
        };
        this.authService.insertUserIntoDb(user);
      })
      .catch(err => {
        console.log(err);
        this.registerError = err.message;
      });
  }

}

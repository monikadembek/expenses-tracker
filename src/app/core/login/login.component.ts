import { Component, OnInit } from '@angular/core';
import { Credentials } from '../models/credentials';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: Credentials = {
    email: '',
    password: ''
  };
  loginForm: FormGroup;

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

  login(values: Credentials): void {
    const email = values.email.trim();
    const password = values.password.trim();
    this.credentials = {
      email,
      password
    };
    this.authService.login(this.credentials)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(err => console.log(err));
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle()
      .then(() => this.router.navigate(['/dashboard']))
      .catch(err => console.log(err));
  }

}

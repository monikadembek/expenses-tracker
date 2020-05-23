import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  authState$: Observable<User | null>;
  user: any;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authState$ = this.authService.authState$;
    this.user = this.authService.user;
    console.log(this.user);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

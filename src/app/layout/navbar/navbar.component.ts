import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthStore } from 'src/app/core/services/auth-store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  authState$: Observable<User | null>;

  constructor(private authService: AuthService,
    private authStore: AuthStore,
    private router: Router) { }

  ngOnInit() {
    this.authState$ = this.authService.authState$;
    // this.authState$.subscribe(data => console.log('user data: ', data));
    // this.authStore.state$.subscribe(state => console.log('authStore state$: ', state));
    // console.log('authStore state', this.authStore.state);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  displayUser(email: string): string {
    return email.split('@')[0];
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { AuthStore } from 'src/app/core/services/auth-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'expenses-tracker-app';

  constructor(private authService: AuthService,
              private authStore: AuthStore) {
  }

  ngOnInit() {
    this.authService.setAuthState().subscribe();
    this.authStore.state$.subscribe(state => console.log('authStore state$: ', state));
    console.log('authStore state: ', this.authStore.state);
  }
}

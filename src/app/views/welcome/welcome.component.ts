import { Component, OnInit } from '@angular/core';
import { AuthStore } from '../../core/services/auth-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  auth$: Observable<any>;

  constructor(private authStore: AuthStore) { }

  ngOnInit() {
    this.auth$ = this.authStore.state$;
  }

}

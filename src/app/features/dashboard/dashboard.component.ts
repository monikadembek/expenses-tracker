import { Component, OnInit } from '@angular/core';
import { AuthStore } from 'src/app/core/services/auth-store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authStore: AuthStore) { }

  ngOnInit() {
    console.log('authStore state: ', this.authStore.state);
  }

}

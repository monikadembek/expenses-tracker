import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeatureRoutingModule } from './feature-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { NotFound404Component } from './not-found404/not-found404.component';


@NgModule({
  declarations: [DashboardComponent, WelcomeComponent, NotFound404Component],
  imports: [
    CommonModule,
    FeatureRoutingModule,
  ],
  exports: [
    FeatureRoutingModule
  ]
})
export class FeatureModule { }

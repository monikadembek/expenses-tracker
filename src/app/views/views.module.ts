import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NotFound404Component } from './not-found404/not-found404.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { ViewsRoutingModule } from './views-routing.module';


@NgModule({
  declarations: [
    NotFound404Component,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ViewsRoutingModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    NotFound404Component,
    WelcomeComponent,
    ViewsRoutingModule
  ]
})
export class ViewsModule { }

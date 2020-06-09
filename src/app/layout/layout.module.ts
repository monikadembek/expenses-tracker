import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NavbarComponent, NavigationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    NavbarComponent,
    NavigationComponent
  ]
})
export class LayoutModule { }

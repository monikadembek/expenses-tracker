import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FeaturesRoutingModule } from './features-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddExpensesComponent } from './expenses/add-expenses/add-expenses.component';
import { ListExpensesComponent } from './expenses/list-expenses/list-expenses.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddExpensesComponent,
    ListExpensesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FeaturesRoutingModule,
  ],
  exports: [
    FeaturesRoutingModule
  ]
})
export class FeaturesModule { }

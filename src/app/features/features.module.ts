import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeaturesRoutingModule } from './features-routing.module';
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
    FeaturesRoutingModule,
  ],
  exports: [
    FeaturesRoutingModule
  ]
})
export class FeaturesModule { }

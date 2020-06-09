import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../core/services/auth.guard';
import { ListExpensesComponent } from './expenses/list-expenses/list-expenses.component';
import { AddExpensesComponent } from './expenses/add-expenses/add-expenses.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'expenses',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ListExpensesComponent
      },
      {
        path: 'add',
        component: AddExpensesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from '../core/services/auth.guard';
import { NotFound404Component } from './not-found404/not-found404.component';


const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: '**', component: NotFound404Component }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule { }

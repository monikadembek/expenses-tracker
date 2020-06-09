import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFound404Component } from '../views/not-found404/not-found404.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: '**', component: NotFound404Component }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ViewsRoutingModule { }

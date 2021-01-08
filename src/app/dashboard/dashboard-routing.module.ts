import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Dashboard3Component } from './dashboard3/dashboard3.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: Dashboard3Component,
        data: {
          title: 'Dashboard'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import {Dashboard1Component} from './dashboard1/dashboard1.component';
import {Dashboard2Component} from './dashboard2/dashboard2.component';


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
      {
        path: 'Dashboard1',
        component: Dashboard1Component,
        data: {
          title: 'Dashboard1'
        }
      },
      {
        path: 'Dashboard2',
        component: Dashboard2Component,
        data: {
          title: 'Dashboard2'
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

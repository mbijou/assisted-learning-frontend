import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularResizedEventModule } from 'angular-resize-event';
import { MatchHeightModule } from "../shared/directives/match-height.directive";

import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";

import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import { Dashboard3Component } from './dashboard3/dashboard3.component';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        NgApexchartsModule,
        AngularResizedEventModule,
        NgSelectModule,
        FormsModule,
    ],
    exports: [],
    declarations: [
        Dashboard1Component,
        Dashboard2Component,
        Dashboard3Component
    ],
    providers: [],
})
export class DashboardModule { }

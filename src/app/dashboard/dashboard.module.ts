import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularResizedEventModule } from 'angular-resize-event';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import 'chartjs-plugin-labels';
import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";

import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { ProgressChartComponent } from './progress-chart/progress-chart.component';
import {ChartsRoutingModule} from '../charts/charts-routing.module';
import {ChartsModule} from 'ng2-charts';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartsRoutingModule,
        ChartsModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        NgApexchartsModule,
        AngularResizedEventModule,
        NgSelectModule,
        FormsModule,
        HttpClientModule,
    ],
    exports: [],
    declarations: [
        Dashboard1Component,
        Dashboard2Component,
        Dashboard3Component,
        ProgressChartComponent
    ],
    providers: [],
})
export class DashboardModule { }

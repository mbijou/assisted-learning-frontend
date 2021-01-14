import { Component, OnInit } from '@angular/core';


export var pieChartLabels: string[] = ["Done", "Open", "Expired"];
export var pieChartData: number[] = [85, 65, 34,];
export var pieChartType = 'pie';
export var pieChartColors: any[] = [{ backgroundColor: ['#F77E17', '#40C057', '#F55252'] }];
export var pieChartOptions: any = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false
};

@Component({
  selector: 'app-progress-chart',
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.scss']
})
export class ProgressChartComponent implements OnInit {

  public pieChartLabels = pieChartLabels;
  public pieChartData = pieChartData;
  public pieChartType = pieChartType;
  public pieChartColors = pieChartColors;
  public pieChartOptions = pieChartOptions;

  constructor() { }

  ngOnInit(): void {
  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }


}

import { Component, OnInit } from '@angular/core';
import {ProgressChartInterface, ProgressChartService} from './progress-chart.service';
import { ChangeDetectorRef } from '@angular/core';


export var pieChartLabels: string[] = ["Done", "Open", "Expired"];
export var pieChartData: number[] = [];
export var pieChartType = 'pie';
export var pieChartColors: any[] = [{ backgroundColor: ['#40C057', '#F77E17', '#F55252'] }];
export var pieChartOptions: any = {
  legend: {
    labels: {
      fontColor: "white",
      fontSize: 18
    }
  },
  animation: false,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    labels: {
      fontSize: 14,
      fontStyle: 'bold',
      render: 'percent',
          fontColor: ['white', 'white', 'white'],
          precision: 2
    }
  },
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

  progressAmounts: ProgressChartInterface = {
    "amount_flashcards_total": null,
    "amount_flashcards_done": null,
    "amount_flashcards_open": null,
    "amount_flashcards_expired": null
  };

  constructor(
      private progressChartService: ProgressChartService,
      private changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {

    let userId = localStorage.getItem("user_id");

    this.progressChartService.get_users_and_accomplishments(userId).subscribe(
        data =>{

          this.pieChartData = [data.amount_flashcards_done, data.amount_flashcards_open, data.amount_flashcards_expired];

          this.progressAmounts = {
            "amount_flashcards_total": data.amount_flashcards_done + data.amount_flashcards_open + data.amount_flashcards_expired,
            "amount_flashcards_done": data.amount_flashcards_done,
            "amount_flashcards_open": data.amount_flashcards_open,
            "amount_flashcards_expired": data.amount_flashcards_expired
          };

          this.changeDetector.detectChanges();
        }
    );

  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }


}

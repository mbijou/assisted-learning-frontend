import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { SingleChoiceService } from '../../single-choice.service';
import {ActivatedRoute } from '@angular/router';
import {SingleChoiceInterface} from '../../edit-single-choice/edit-single-choice.service';


@Component({
  selector: 'app-new-single-choice-answer-form',
  templateUrl: './new-single-choice-answer-form.component.html',
  styleUrls: ['./new-single-choice-answer-form.component.scss']
})
export class NewSingleChoiceAnswerFormComponent implements OnInit {

  private singleChoiceId;

  singleChoiceData: SingleChoiceInterface = {
    "question": null, "workload": null, "deadline": null,
    "solution": null, "user": null,
  }

  get scd(){
    return this.singleChoiceData;
  }

  constructor(
      private singleChoiceService: SingleChoiceService,
      private activatedRoute: ActivatedRoute,
      private changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {

    this.singleChoiceId = this.activatedRoute.snapshot.params["id"];

    this.singleChoiceService.getSingleChoices(this.singleChoiceId).subscribe(
        data => {

          this.singleChoiceData.question = data.question;
          this.singleChoiceData.workload = data.workload;
          this.singleChoiceData.deadline = data.deadline;
          this.singleChoiceData.solution = data.solution;
          this.singleChoiceData.user = data.user;





          this.changeDetector.detectChanges();

        }
    );

  }

}

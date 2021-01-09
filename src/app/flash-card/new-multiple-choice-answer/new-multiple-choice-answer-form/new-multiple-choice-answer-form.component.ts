import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NewMultipleChoiceAnswerService } from '../new-multiple-choice-answer.service';
import { MultipleChoiceInterface } from '../../edit-multiple-choice/edit-multiple-choice.service';

@Component({
  selector: 'app-new-multiple-choice-answer-form',
  templateUrl: './new-multiple-choice-answer-form.component.html',
  styleUrls: ['./new-multiple-choice-answer-form.component.scss']
})
export class NewMultipleChoiceAnswerFormComponent implements OnInit {

  private multipleChoiceId;
  multipleChoiceAnswerFormSubmitted = false;

  multipleChoiceAnswerForm = new FormGroup({
    answer1: new FormControl(null, [Validators.required]),
    answer2: new FormControl(null, [Validators.required]),
    answer3: new FormControl(null, [Validators.required]),
    answer4: new FormControl(null, [Validators.required]),
  });

  multipleChoiceData: MultipleChoiceInterface = {
    "question": null, "workload": null, "deadline": null, "solution_set": [],
  }

  get mcd(){
    return this.multipleChoiceData;
  }

  get mcfc(){
    return this.multipleChoiceAnswerForm.controls;
  }

  constructor(
      private newMultipleChoiceAnswerService: NewMultipleChoiceAnswerService,
      private activatedRoute: ActivatedRoute,
      private changeDetector: ChangeDetectorRef,
      private router: Router,
  ) { }

  ngOnInit(): void {

    this.multipleChoiceId = this.activatedRoute.snapshot.params["id"];

    this.newMultipleChoiceAnswerService.getMultipleChoice(this.multipleChoiceId).subscribe(
        data => {

          this.multipleChoiceData.question = data.question;
          this.multipleChoiceData.deadline = data.deadline;
          this.multipleChoiceData.workload = data.workload;
          this.multipleChoiceData.solution_set = data.solution_set;

          this.changeDetector.detectChanges();
        },
        errors =>{

          // TODO Errors machen, onSubmit einrichten. Backend logik für bearbeiten Mitten drin
        }
    );

  }

  onSubmit(){


  }

}

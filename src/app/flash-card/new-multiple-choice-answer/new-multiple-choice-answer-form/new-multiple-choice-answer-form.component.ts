import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {MultipleChoiceAnswerSetInterface, NewMultipleChoiceAnswerService} from '../new-multiple-choice-answer.service';
import { MultipleChoiceInterface } from '../../edit-multiple-choice/edit-multiple-choice.service';


@Component({
  selector: 'app-new-multiple-choice-answer-form',
  templateUrl: './new-multiple-choice-answer-form.component.html',
  styleUrls: ['./new-multiple-choice-answer-form.component.scss']
})
export class NewMultipleChoiceAnswerFormComponent implements OnInit {

  private multipleChoiceId;
  multipleChoiceAnswerFormSubmitted = false;
  formErrors = {"serverErrors": null};
  next = '/dashboard';

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

    this.activatedRoute.queryParams.subscribe(params => {
      if(params['next']){
        this.next = params['next'];
      }
    });

    this.multipleChoiceId = this.activatedRoute.snapshot.params["id"];

    this.newMultipleChoiceAnswerService.getMultipleChoice(this.multipleChoiceId).subscribe(
        data => {

          this.multipleChoiceData.question = data.question;
          this.multipleChoiceData.deadline = data.deadline;
          this.multipleChoiceData.workload = data.workload;
          this.multipleChoiceData.solution_set = data.solution_set;

          this.changeDetector.detectChanges();
        }
    );

  }

  handleMultipleChoiceAnswerSetErrors(errors){
    for(let index in errors["error"]["multiplechoicesolutionanswer_set"]){
      if(errors["error"]["multiplechoicesolutionanswer_set"].hasOwnProperty(index)) {
        let errorObject = errors["error"]["multiplechoicesolutionanswer_set"][index];
        if("answer" in errorObject){
          let answerKey = "answer" + (parseInt(index)+1).toString();
          this.multipleChoiceAnswerForm.controls[answerKey].setErrors(
              {serverErrors: errorObject["answer"]}
          );
        }
      }
    }
  }

  onSubmit(){

    this.formErrors.serverErrors = null;

    let formData: MultipleChoiceAnswerSetInterface = {
      "multiplechoicesolutionanswer_set": [
        {"solution": this.multipleChoiceData.solution_set[0].id, "answer": this.multipleChoiceAnswerForm.controls["answer1"].value},
        {"solution": this.multipleChoiceData.solution_set[1].id, "answer": this.multipleChoiceAnswerForm.controls["answer2"].value},
        {"solution": this.multipleChoiceData.solution_set[2].id, "answer": this.multipleChoiceAnswerForm.controls["answer3"].value},
        {"solution": this.multipleChoiceData.solution_set[3].id, "answer": this.multipleChoiceAnswerForm.controls["answer4"].value},
      ]
    }

    this.newMultipleChoiceAnswerService.createNewMultipleChoiceAnswer(this.multipleChoiceId, formData).subscribe(
        data => {
          this.multipleChoiceAnswerFormSubmitted = true;
          this.router.navigate(['/dashboard/']);
        },
        errors =>{
          this.multipleChoiceAnswerFormSubmitted = true;

          this.handleMultipleChoiceAnswerSetErrors(errors);

          if(errors["error"].hasOwnProperty("non_field_errors")){
            this.formErrors = {"serverErrors": errors["error"]["non_field_errors"]};
          }

          this.changeDetector.detectChanges();
        }
    );

  }



}

import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SingleChoiceAnswerInterface, SingleChoiceService} from '../../single-choice.service';
import {ActivatedRoute } from '@angular/router';
import {SingleChoiceInterface} from '../../single-choice.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-single-choice-answer-form',
  templateUrl: './new-single-choice-answer-form.component.html',
  styleUrls: ['./new-single-choice-answer-form.component.scss']
})
export class NewSingleChoiceAnswerFormComponent implements OnInit {

  private singleChoiceId;
  singleChoiceAnswerFormSubmitted = false;

  singleChoiceAnswerForm = new FormGroup({
      answer: new FormControl(null,[Validators.required]),
      });

  singleChoiceData: SingleChoiceInterface = {
    "question": null, "workload": null, "deadline": null,
    "solution": null, "user": null,
  }

  get scd(){
    return this.singleChoiceData;
  }

  get scfc(){
      return this.singleChoiceAnswerForm.controls;
  }

  constructor(
      private singleChoiceService: SingleChoiceService,
      private activatedRoute: ActivatedRoute,
      private changeDetector: ChangeDetectorRef,
      private router: Router,
  ) { }

  ngOnInit(): void {

    this.singleChoiceId = this.activatedRoute.snapshot.params["id"];

    this.singleChoiceService.getSingleChoice(this.singleChoiceId).subscribe(
        data => {

          this.singleChoiceData.question = data.question;
          this.singleChoiceData.workload = data.workload;
          this.singleChoiceData.deadline = data.deadline;
          this.singleChoiceData.solution = data.solution;
          this.singleChoiceData.user = data.user;

          // TODO
          this.changeDetector.detectChanges();

        }
    );
  }

  onSubmit(){

      let data: SingleChoiceAnswerInterface = {"answer": this.singleChoiceAnswerForm.controls["answer"].value}


      this.singleChoiceService.createNewSingleChoiceAnswer(this.singleChoiceId, data).subscribe(
          data => {
              this.singleChoiceAnswerFormSubmitted = true;

              this.router.navigate(['/dashboard/']);
          },
          errors => {
              this.singleChoiceAnswerFormSubmitted = true;

              for(let key in errors["error"]){
                  if(errors["error"].hasOwnProperty(key)){
                      this.singleChoiceAnswerForm.controls[key].setErrors(
                          { serverErrors: errors["error"][key] }
                      );
                  }
              }

              this.changeDetector.detectChanges();
          });



  }

}

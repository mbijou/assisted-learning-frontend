import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NewMultipleChoiceService, SolutionInterface} from '../new-multiple-choice.service';
import { MultipleChoiceInterface } from '../new-multiple-choice.service';
import { DatePipe } from '@angular/common';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';


const now = new Date();

const I18N_VALUES = {
  en: {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
};

@Component({
  selector: 'new-multiple-choice-form',
  templateUrl: './new-multiple-choice-form.component.html',
  styleUrls: ['./new-multiple-choice-form.component.scss', '/assets/sass/libs/datepicker.scss',],
  encapsulation: ViewEncapsulation.None
})
export class NewMultipleChoiceFormComponent implements OnInit {
  // Variable declaration
  d: any;
  model: NgbDateStruct;
  popupModel;
  date: {year: number, month: number};
  displayMonths = 2;
  navigation = 'select';
  disabledModel: NgbDateStruct = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  disabled = true;
  customModel: NgbDateStruct;

  configModal;    // Global configuration of datepickers


  // Selects today's date
  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  // Custom Day View Starts
  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: {month: number}) {
    return date.month !== current.month;
  }
  // Custom Day View Ends


  // FORM Starts

  multipleChoiceFormSubmitted = false;

  multipleChoiceForm = new FormGroup({
    question: new FormControl(null, [Validators.required]),
    answer1: new FormControl(null, [Validators.required]),
    solution1: new FormControl(null, [Validators.required]),
    answer2: new FormControl(null, [Validators.required]),
    solution2: new FormControl(null, [Validators.required]),
    answer3: new FormControl(null, [Validators.required]),
    solution3: new FormControl(null, [Validators.required]),
    answer4: new FormControl(null, [Validators.required]),
    solution4: new FormControl(null, [Validators.required]),
    deadline: new FormControl(null, [Validators.required]),
    workload: new FormControl(null, [Validators.required]),
  });

  // FORM Ends

  constructor(
      private router: Router,
      private changeDetector: ChangeDetectorRef,
      public newMultipleChoiceService: NewMultipleChoiceService,
      public datePipe: DatePipe
  ){

  }

  ngOnInit(): void {
  }

  get mc() {
    return this.multipleChoiceForm.controls;
  }

  getFormattedDeadline(deadline){
    if(deadline && deadline.day && deadline.month && deadline.year){
      deadline = new Date(deadline.year, deadline.month-1, deadline.day);
      deadline = this.datePipe.transform(deadline, 'yyyy-MM-dd');
    }
    return deadline;
  }

  handleSolutionSetErrors(errors){
    for(let index in errors["error"]["solution_set"]){
      if(errors["error"]["solution_set"].hasOwnProperty(index)) {
        let errorObject = errors["error"]["solution_set"][index];

        if("answer" in errorObject){
          let answerKey = "answer" + (parseInt(index)+1).toString();
            this.multipleChoiceForm.controls[answerKey].setErrors(
                {serverErrors: errorObject["answer"]}
            );
        }

        if("solution" in errorObject){
          let solutionKey = "solution" + (parseInt(index)+1).toString();
            this.multipleChoiceForm.controls[solutionKey].setErrors(
                {serverErrors: errorObject["solution"]}
            );
        }
      }
    }
  }

  getSolutionSetFromMultipleChoiceForm(){
    let solutionSet: SolutionInterface[] = [
      {
        "answer": this.multipleChoiceForm.controls.answer1.value,
        "solution": this.multipleChoiceForm.controls.solution1.value,

      },
      {
        "answer": this.multipleChoiceForm.controls.answer2.value,
        "solution": this.multipleChoiceForm.controls.solution2.value,

      },
      {
        "answer": this.multipleChoiceForm.controls.answer3.value,
        "solution": this.multipleChoiceForm.controls.solution3.value,

      },
      {
        "answer": this.multipleChoiceForm.controls.answer4.value,
        "solution": this.multipleChoiceForm.controls.solution4.value,

      },
    ]

    return solutionSet;
  }

  onSubmit() {

    let deadline = this.getFormattedDeadline(this.multipleChoiceForm.controls.deadline.value);

    let solutionSet = this.getSolutionSetFromMultipleChoiceForm();

    const data: MultipleChoiceInterface = {
      "question": this.multipleChoiceForm.controls.question.value,
      "workload": this.multipleChoiceForm.controls.workload.value,
      "deadline": deadline,
      "user": parseInt(localStorage.getItem("user_id")),
      "solution_set": solutionSet,
    };

    this.newMultipleChoiceService.createNewMultipleChoice(data).subscribe(
        data => {
          this.multipleChoiceFormSubmitted = true;
          this.router.navigate(['/flashcards/multiple-choices/' + data["id"] + '/edit/'],
              {queryParams: {"next": "/flashcards/new"}}
          );

        },
        errors => {
          this.multipleChoiceFormSubmitted = true;

          console.warn(errors);

          // adding error messages to form controls
          for(let key in errors["error"]){
            if(key == "solution_set"){
              continue;
            }
            if(errors["error"].hasOwnProperty(key)){
              this.multipleChoiceForm.controls[key].setErrors(
                  { serverErrors: errors["error"][key] }
              );
            }
          }

          this.handleSolutionSetErrors(errors);

          this.changeDetector.detectChanges();
        },
    );




    if (this.multipleChoiceForm.invalid) {
      return;
    }


  }


}

import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { SingleChoiceService } from '../../single-choice.service';
import { SingleChoiceInterface } from '../../single-choice.service';
import { DatePipe } from '@angular/common';
import {setProperty} from 'swiper/angular/angular/src/utils/utils';

const now = new Date();

const I18N_VALUES = {
  en: {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
};

@Component({
  selector: 'new-single-choice-form',
  templateUrl: './new-single-choice-form.component.html',
  styleUrls: ['./new-single-choice-form.component.scss', '/assets/sass/libs/datepicker.scss',],
  encapsulation: ViewEncapsulation.None
})

export class NewSingleChoiceFormComponent implements OnInit {
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

  singleChoiceFormSubmitted = false;

  singleChoiceForm = new FormGroup({
    question: new FormControl(null,[Validators.required]),
    solution: new FormControl(null,[Validators.required]),
    deadline: new FormControl(null,[Validators.required]),
    workload: new FormControl(null,[Validators.required]),

  }
  );

  // FORM Ends


  constructor(
      private router: Router,
      private changeDetector: ChangeDetectorRef,
      public newSingleChoiceService: SingleChoiceService,
      public datePipe: DatePipe) {
  }

  ngOnInit(): void {
  }

  get sc() {
    return this.singleChoiceForm.controls;
  }

  getFormattedDeadline(deadline){
    if(deadline && deadline.day && deadline.month && deadline.year){
      deadline = new Date(deadline.year, deadline.month-1, deadline.day);
      deadline = this.datePipe.transform(deadline, 'yyyy-MM-dd');
    }
    return deadline;
  }


  onSubmit() {

    let deadline = this.getFormattedDeadline(this.singleChoiceForm.controls.deadline.value);

    const data: SingleChoiceInterface = {
      "question": this.singleChoiceForm.controls.question.value,
      "workload": this.singleChoiceForm.controls.workload.value,
      "solution": this.singleChoiceForm.controls.solution.value,
      "deadline": deadline,
      "user": parseInt(localStorage.getItem("user_id")),
    };


    this.newSingleChoiceService.createNewSingleChoice(data).subscribe(
        data => {

          this.singleChoiceFormSubmitted = true;
          this.router.navigate(['/flashcards/single-choices/' + data["id"] + '/edit/'],
              { queryParams: {next: "/flashcards/new"}
              }
          );

        },
        errors => {

          this.singleChoiceFormSubmitted = true;

          // adding error messages to form controls
          for(let key in errors["error"]){
            if(errors["error"].hasOwnProperty(key)){
              this.singleChoiceForm.controls[key].setErrors(
                  { serverErrors: errors["error"][key] }
                  );
            }
          }


          this.changeDetector.detectChanges();

          /*
          Object.keys(errors["error"])
              .forEach((key) => {
                if(errors["error"].hasOwnProperty(key)){

                  this.singleChoiceForm.controls[key].setErrors(
                      { serverErrors: errors["error"][key] }
                  );

                }
              }
          );*/
        },
    );

  }


}

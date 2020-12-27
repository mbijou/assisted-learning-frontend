import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { NewSingleChoiceService } from '../new-single-choice.service';
import { SingleChoiceInterface } from '../new-single-choice.service';
import { DatePipe } from '@angular/common';
import {setProperty} from 'swiper/angular/angular/src/utils/utils';


const now = new Date();

const I18N_VALUES = {
  en: {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
};

// Range datepicker Start
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
    one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day > two.day : one.month > two.month : one.year > two.year;
// Range datepicker Ends
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
      public newSingleChoiceService: NewSingleChoiceService,
      public datePipe: DatePipe) {
  }

  ngOnInit(): void {
  }


  get sc() {
    return this.singleChoiceForm.controls;
  }

  onSubmit() {

    let deadline = this.singleChoiceForm.controls.deadline.value;

    if(deadline){
      deadline = new Date(deadline.year, deadline.month, deadline.day);
      deadline = this.datePipe.transform(deadline, 'yyyy-MM-dd');
    }

    console.warn("babibu: " , deadline);


    const data: SingleChoiceInterface = {
      "question": this.singleChoiceForm.controls.question.value,
      "workload": this.singleChoiceForm.controls.workload.value,
      "solution": this.singleChoiceForm.controls.solution.value,
      "deadline": deadline
    };


    this.newSingleChoiceService.createNewSingleChoice(data).subscribe(
        data => {

          this.singleChoiceFormSubmitted = true;
          console.warn("hey hey hey ora ora: ", data);
          this.router.navigate(['/']);

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

          console.warn("Errors: ",errors);

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

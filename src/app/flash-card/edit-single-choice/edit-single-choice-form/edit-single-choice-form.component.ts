import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { EditSingleChoiceService } from '../edit-single-choice.service';
import { SingleChoiceInterface } from '../edit-single-choice.service';
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
  selector: 'edit-single-choice-form',
  templateUrl: './edit-single-choice-form.component.html',
  styleUrls: ['./edit-single-choice-form.component.scss', '/assets/sass/libs/datepicker.scss',],
  encapsulation: ViewEncapsulation.None
})

export class EditSingleChoiceFormComponent implements OnInit {

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
        question: new FormControl(null, [Validators.required]),
        solution: new FormControl(null,[Validators.required]),
        deadline: new FormControl(null,[Validators.required]),
        workload: new FormControl(null,[Validators.required]),
      }
  );


  // FORM Ends

  id;
  next: string = '/flashcards/flashcards';

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private changeDetector: ChangeDetectorRef,
      public editSingleChoiceService: EditSingleChoiceService,
      public datePipe: DatePipe) {
  }

  ngOnInit(): void {

      console.warn(this.next);

    this.activatedRoute.queryParams.subscribe(params => {
        if(params['next']){
            this.next = params['next'];
        }
    });

    this.id = this.activatedRoute.snapshot.params["id"];

    this.editSingleChoiceService.getSingleChoice(this.id).subscribe(
        data => {
          this.singleChoiceForm.controls.question.setValue(data.question);
          this.singleChoiceForm.controls.solution.setValue(data.solution);
          this.singleChoiceForm.controls.workload.setValue(data.workload);

          let deadline = new Date(data.deadline);
          this.popupModel = {year: deadline.getFullYear(), month: deadline.getMonth() + 1, day: deadline.getDate()};

          this.changeDetector.detectChanges();

        }
    );
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

    this.editSingleChoiceService.updateSingleChoice(data, this.id).subscribe(
        data => {

          this.singleChoiceFormSubmitted = true;
          this.router.navigate(['/flashcards/single-choices/' + this.id + '/edit/']);

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

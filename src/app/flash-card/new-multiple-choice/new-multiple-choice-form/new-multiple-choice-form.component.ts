import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NewMultipleChoiceService, SolutionInterface} from '../new-multiple-choice.service';
import { MultipleChoiceInterface } from '../new-multiple-choice.service';
import { DatePipe } from '@angular/common';

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
    if(deadline){
      deadline = new Date(deadline.year, deadline.month, deadline.day);
      deadline = this.datePipe.transform(deadline, 'yyyy-MM-dd');
    }
    return deadline;
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

      "solution_set": solutionSet,
    };

    this.newMultipleChoiceService.createNewMultipleChoice(data).subscribe(
        data => {
          this.multipleChoiceFormSubmitted = true;
          this.router.navigate(['/']);

        },
        errors => {
          this.multipleChoiceFormSubmitted = true;
          /***************************************/
          /* TODO ERROR HANDLING MULTIPLE CHOICE */
          /**************************************/
          this.changeDetector.detectChanges();
        },
    );




    if (this.multipleChoiceForm.invalid) {
      return;
    }




    this.router.navigate(['/']);
  }


}

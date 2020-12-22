import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

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
  selector: 'new-multiple-choice-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss', '/assets/sass/libs/datepicker.scss',],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit {
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

  // Range datepicker start
  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  // Range datepicker starts

  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);
  // Range datepicker ends


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
    answer3: new FormControl(null, []),
    solution3: new FormControl(null, []),
    answer4: new FormControl(null, []),
    solution4: new FormControl(null, []),
    deadline: new FormControl(null, [Validators.required]),
    workload: new FormControl(null, [Validators.required]),
  });

  // FORM Ends

  constructor(private router: Router) { }



  ngOnInit(): void {
  }

  get sc() {
    return this.multipleChoiceForm.controls;
  }

  onSubmit() {
    this.multipleChoiceFormSubmitted = true;
    console.warn("WAS BRUDER? ", this.multipleChoiceForm.invalid);

    console.warn(this.multipleChoiceForm.controls.solution);

    console.warn(this.multipleChoiceForm.controls);

    if (this.multipleChoiceForm.invalid) {
      return;
    }




    this.router.navigate(['/']);
  }


}

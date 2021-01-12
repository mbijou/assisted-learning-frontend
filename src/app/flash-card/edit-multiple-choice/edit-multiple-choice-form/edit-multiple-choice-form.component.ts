import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { EditMultipleChoiceService, SolutionInterface} from '../edit-multiple-choice.service';
import { MultipleChoiceInterface } from '../edit-multiple-choice.service';
import { DatePipe } from '@angular/common';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';
import {NewMultipleChoiceService} from '../../new-multiple-choice/new-multiple-choice.service';
import { NewMultipleChoiceFormComponent } from '../../new-multiple-choice/new-multiple-choice-form/new-multiple-choice-form.component';


const now = new Date();

const I18N_VALUES = {
  en: {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
};

@Component({
  selector: 'edit-multiple-choice-form',
  templateUrl: './edit-multiple-choice-form.component.html',
  styleUrls: ['./edit-multiple-choice-form.component.scss', '/assets/sass/libs/datepicker.scss',],
  encapsulation: ViewEncapsulation.None
})
export class EditMultipleChoiceFormComponent implements OnInit {

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

  id;
  solutionSetIds = {"solution1": null, "solution2": null, "solution3": null, "solution4": null};
  next = '/flashcards/flashcards';

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private changeDetector: ChangeDetectorRef,
      public editMultipleChoiceService: EditMultipleChoiceService,
      public datePipe: DatePipe
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      if(params['next']){
        this.next = params['next'];
      }
    });

    this.id = this.activatedRoute.snapshot.params["id"];


    this.editMultipleChoiceService.getMultipleChoice(this.id).subscribe(
        data => {
          this.multipleChoiceForm.controls.question.setValue(data.question);
          // this.multipleChoiceForm.controls.solution.setValue(data.solution);
          this.multipleChoiceForm.controls.workload.setValue(data.workload);

          for(let index in data.solution_set){
            let solution = data.solution_set[index];
            this.multipleChoiceForm.controls["answer"+(parseInt(index)+1)].setValue(solution.answer);
            this.multipleChoiceForm.controls["solution"+(parseInt(index)+1)].setValue(solution.solution);

            this.solutionSetIds["solution"+(parseInt(index)+1)] = solution.id;
          }

          let deadline = new Date(data.deadline);
          this.popupModel = {year: deadline.getFullYear(), month: deadline.getMonth() + 1, day: deadline.getDate()};

          this.changeDetector.detectChanges();

        }
    );

  }

  get mc() {
    return this.multipleChoiceForm.controls;
  }

  getFormattedDeadline = NewMultipleChoiceFormComponent.prototype.getFormattedDeadline;

  handleSolutionSetErrors = NewMultipleChoiceFormComponent.prototype.handleSolutionSetErrors;

  getSolutionSetFromMultipleChoiceForm(){
    let solutionSet: SolutionInterface[] = [
      {
        "id": this.solutionSetIds["solution1"],
        "answer": this.multipleChoiceForm.controls.answer1.value,
        "solution": this.multipleChoiceForm.controls.solution1.value,

      },
      {
        "id": this.solutionSetIds["solution2"],
        "answer": this.multipleChoiceForm.controls.answer2.value,
        "solution": this.multipleChoiceForm.controls.solution2.value,

      },
      {
        "id": this.solutionSetIds["solution3"],
        "answer": this.multipleChoiceForm.controls.answer3.value,
        "solution": this.multipleChoiceForm.controls.solution3.value,

      },
      {
        "id": this.solutionSetIds["solution4"],
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

    this.editMultipleChoiceService.updateMultipleChoice(data, this.id).subscribe(
        data => {
          this.multipleChoiceFormSubmitted = true;
          this.router.navigate(['/flashcards/multiple-choices/' + data["id"] + '/edit/']);

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

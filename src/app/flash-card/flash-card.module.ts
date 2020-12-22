import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewFlashCardComponent } from './new-flash-card/new-flash-card.component';
import { FlashCardRoutingModule } from './flash-card-routing.module';
import { NewSingleChoiceComponent } from './new-single-choice/new-single-choice.component';
import { NewMultipleChoiceComponent } from './new-multiple-choice/new-multiple-choice.component';
import { FormComponent as SingleChoiceFormComponent } from './new-single-choice/form/form.component';
import { FormComponent as MultipleChoiceFormComponent } from './new-multiple-choice/form/form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NewFlashCardComponent, NewSingleChoiceComponent, NewMultipleChoiceComponent, SingleChoiceFormComponent,
    MultipleChoiceFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FlashCardRoutingModule
  ]
})
export class FlashCardModule { }

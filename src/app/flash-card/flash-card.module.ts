import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewFlashCardComponent } from './new-flash-card/new-flash-card.component';
import { FlashCardRoutingModule } from './flash-card-routing.module';
import { NewSingleChoiceComponent } from './new-single-choice/new-single-choice.component';
import { NewMultipleChoiceComponent } from './new-multiple-choice/new-multiple-choice.component';
import { NewSingleChoiceFormComponent as SingleChoiceFormComponent } from './new-single-choice/new-single-choice-form/new-single-choice-form.component';
import { NewMultipleChoiceFormComponent } from './new-multiple-choice/new-multiple-choice-form/new-multiple-choice-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { EditSingleChoiceComponent } from './edit-single-choice/edit-single-choice.component';
import { EditSingleChoiceFormComponent } from './edit-single-choice/edit-single-choice-form/edit-single-choice-form.component'


@NgModule({
  declarations: [NewFlashCardComponent, NewSingleChoiceComponent, NewMultipleChoiceComponent, SingleChoiceFormComponent,
    NewMultipleChoiceFormComponent,
    EditSingleChoiceComponent,
    EditSingleChoiceFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FlashCardRoutingModule,
    HttpClientModule,
  ],
  providers: [
      DatePipe
  ],
})
export class FlashCardModule { }

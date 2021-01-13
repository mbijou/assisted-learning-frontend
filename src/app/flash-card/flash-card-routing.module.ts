import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewFlashCardComponent } from "./new-flash-card/new-flash-card.component";
import { NewSingleChoiceComponent } from "./new-single-choice/new-single-choice.component";
import { NewMultipleChoiceComponent } from "./new-multiple-choice/new-multiple-choice.component";
import { EditSingleChoiceComponent } from './edit-single-choice/edit-single-choice.component';
import { EditMultipleChoiceComponent } from './edit-multiple-choice/edit-multiple-choice.component';
import { NewSingleChoiceAnswerComponent } from './new-single-choice-answer/new-single-choice-answer.component';
import { NewMultipleChoiceAnswerComponent } from './new-multiple-choice-answer/new-multiple-choice-answer.component';
import {AllFlashCardsComponent} from './all-flash-cards/all-flash-cards.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'new',
                component: NewFlashCardComponent,
                data: {
                    title: 'New Flashcard'
                }
            },
            {
                // path: 'new/single-choice',
                path: 'single-choices/new',
                component: NewSingleChoiceComponent,
                data: {
                    title: 'New Flashcard'
                }
            },
            {
                path: 'single-choices/:id/edit',
                component: EditSingleChoiceComponent,
                data: {
                    title: 'Edit Flashcard'
                }
            },
            {
                // path: 'new/multiple-choice',
                path: 'multiple-choices/new',
                component: NewMultipleChoiceComponent,
                data: {
                    title: 'New Flashcard'
                }
            },
            {
                path: 'multiple-choices/:id/edit',
                component: EditMultipleChoiceComponent,
                data: {
                    title: 'Edit Flashcard'
                }
            },
            {
                path: 'single-choices/:id/answers/new',
                component: NewSingleChoiceAnswerComponent,
                data: {
                    title: 'Answer Singlechoice'
                },
                pathMatch: 'full',
            },
            {
                path: 'multiple-choices/:id/answers/new',
                component: NewMultipleChoiceAnswerComponent,
                data: {
                    title: 'Answer Multiplechoice'
                }
            },
            {
                path: 'flashcards',
                component: AllFlashCardsComponent,
                data: {
                    title: 'All Flashcards'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FlashCardRoutingModule { }

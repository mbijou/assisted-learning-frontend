import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewFlashCardComponent } from "./new-flash-card/new-flash-card.component";
import { NewSingleChoiceComponent } from "./new-single-choice/new-single-choice.component";
import { NewMultipleChoiceComponent } from "./new-multiple-choice/new-multiple-choice.component";
import { EditSingleChoiceComponent } from './edit-single-choice/edit-single-choice.component';

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

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FlashCardRoutingModule { }

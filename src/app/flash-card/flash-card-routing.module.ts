import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewFlashCardComponent } from "./new-flash-card/new-flash-card.component";
import { NewSingleChoiceComponent } from "./new-single-choice/new-single-choice.component";
import { NewMultipleChoiceComponent } from "./new-multiple-choice/new-multiple-choice.component";

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
                path: 'new/single-choice',
                component: NewSingleChoiceComponent,
                data: {
                    title: 'New Flashcard'
                }
            },
            {
                path: 'new/multiple-choice',
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

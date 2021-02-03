import { Component, OnInit } from '@angular/core';
import {FlashCardInterface, FlashCardService} from '../../flash-card/flash-card.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'dashboard3',
  templateUrl: './dashboard3.component.html',
  styleUrls: ['./dashboard3.component.scss']
})
export class Dashboard3Component implements OnInit {

  constructor(
      private flashCardService: FlashCardService,
      private changeDetector: ChangeDetectorRef
  ) { }

  flashcard: FlashCardInterface = {
    "id": null, "question": null, "deadline": null, "workload": null,
    "type": null, "object_id": null, "rank": null, "answer_url": null,
      "edit_url": null, "status": null, "bootstrap_color": null,
  };

  ngOnInit(): void {
    let user_id = localStorage.getItem("user_id");
    this.flashCardService.getRankOneFlashCards(user_id).subscribe(
        data => {
          if(data.length == 0){
            return;
          }
          this.flashcard.id = data[0].id;
          this.flashcard.question = data[0].question;
          this.flashcard.deadline = data[0].deadline;
          this.flashcard.workload = data[0].workload
          this.flashcard.type = data[0].type;
          this.flashcard.object_id = data[0].object_id;
          this.flashcard.rank = data[0].rank;

          if(this.flashcard.type == "singlechoice"){
            this.flashcard.answer_url = `/flashcards/single-choices/${this.flashcard.object_id}/answers/new`;
          }else if(this.flashcard.type == "multiplechoice"){
            this.flashcard.answer_url = `/flashcards/multiple-choices/${this.flashcard.object_id}/answers/new`;
          }



          this.changeDetector.detectChanges();

        }
    );

  }


  learningGroups = [
    { id: 1, name: 'School' },
    { id: 2, name: 'Friends' },
    { id: 3, name: 'Teachers', disabled: true },
    { id: 4, name: 'Bad Boys!' },
  ];

  selectedLearningGroup = "School";


}

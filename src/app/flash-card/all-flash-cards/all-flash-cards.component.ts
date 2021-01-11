import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FlashCardSetInterface, FlashCardService } from '../flash-card.service';


@Component({
  selector: 'app-all-flash-cards',
  templateUrl: './all-flash-cards.component.html',
  styleUrls: ['./all-flash-cards.component.scss']
})
export class AllFlashCardsComponent implements OnInit {

  flashCardSetData: FlashCardSetInterface = {
    "flashcards": [],
  };

  get fcsd(){
    return this.flashCardSetData;
  }

  constructor(
      private flashCardService:FlashCardService,
      private changeDetector: ChangeDetectorRef,) { }

  ngOnInit(): void {


    this.flashCardService.getFlashCards().subscribe(
        data => {

          for(let flashcard_key in data){
            let flashcard = data[flashcard_key];
            if(flashcard.type == "singlechoice"){
              flashcard.edit_url = `/flashcards/single-choices/${flashcard.object_id}/edit`;
              flashcard.answer_url = `/flashcards/single-choices/${flashcard.object_id}/answers/new`;
            }
            else if(flashcard.type == "multiplechoice"){
              flashcard.edit_url = `/flashcards/multiple-choices/${flashcard.object_id}/edit`;
              flashcard.answer_url = `/flashcards/multiple-choices/${flashcard.object_id}/answers/new`;
            }
            this.flashCardSetData.flashcards.push(flashcard);
          }
          console.warn(this.flashCardSetData);

          // TODO TYPEN NAMEN ANZEIGEn
          // TODO LOGIK IM BACKEND FÜR ABARBEITEN MITTEN DRIN
          // TODO PAGINATION
          // TODO 2 dashboard orange, rot anzeigen,

          this.changeDetector.detectChanges();
        }
    );


  }

}

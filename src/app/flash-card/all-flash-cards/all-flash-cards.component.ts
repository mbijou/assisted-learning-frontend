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

  nextPage = null;
  previousPage = null;

  get fcsd(){
    return this.flashCardSetData;
  }

  constructor(
      private flashCardService:FlashCardService,
      private changeDetector: ChangeDetectorRef,) { }

  getPreviousFlashcards(){
    if(this.previousPage){
      this.getFlashcards(this.previousPage);
    }
  }

  getNextFlashcards(){
    if(this.nextPage){
      this.getFlashcards(this.nextPage);
    }
  }

  getFlashcards(url=null){
    let user_id = localStorage.getItem("user_id");
    this.flashCardService.getFlashCards(url, user_id).subscribe(
        data => {
          this.flashCardSetData = {"flashcards": []};
          let results = data.results;

          this.nextPage = data.next;
          this.previousPage = data.previous;

          for(let flashcard_key in results){
            let flashcard = results[flashcard_key];
            if(flashcard.type == "singlechoice"){
              flashcard.edit_url = `/flashcards/single-choices/${flashcard.object_id}/edit`;
              flashcard.answer_url = '/flashcards/single-choices';
              flashcard.type = "Single Choice";
            }
            else if(flashcard.type == "multiplechoice"){
              flashcard.edit_url = `/flashcards/multiple-choices/${flashcard.object_id}/edit`;
              flashcard.answer_url = '/flashcards/multiple-choices';
              flashcard.type = "Multiple Choice";
            }
            this.flashCardSetData.flashcards.push(flashcard);
          }

          // TODO DOKU ANFANGEN
          // TODO LERNVORSCHRITT
          // TODO LERNGRUPPE

          this.changeDetector.detectChanges();
        }
    );
  }

  ngOnInit(): void {

    this.getFlashcards();


  }

}

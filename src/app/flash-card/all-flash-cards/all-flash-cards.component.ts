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
            }
            else if(flashcard.type == "multiplechoice"){
              flashcard.edit_url = `/flashcards/multiple-choices/${flashcard.object_id}/edit`;
            }
            this.flashCardSetData.flashcards.push(flashcard);
          }
          console.warn(this.flashCardSetData);

          // TODO 1 Delete Button oben rechts im edit form,
          // TODO 2 dashboard orange, rot anzeigen,
          // TODO 3 Back button von Edit zur view all

          this.changeDetector.detectChanges();
        }
    );


  }

}

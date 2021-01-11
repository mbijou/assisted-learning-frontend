import { Component, OnInit } from '@angular/core';
import { DeleteMultipleChoiceService } from './delete-multiple-choice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-multiple-choice',
  templateUrl: './delete-multiple-choice.component.html',
  styleUrls: ['./delete-multiple-choice.component.scss']
})
export class DeleteMultipleChoiceComponent implements OnInit {

  constructor(
      private deleteMultipleChoiceService: DeleteMultipleChoiceService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
  ) { }

  multipleChoiceId;

  ngOnInit(): void {
    this.multipleChoiceId = this.activatedRoute.snapshot.params["id"];
  }

  deleteMultipleChoice(){
    this.deleteMultipleChoiceService.deleteMultipleChoice(this.multipleChoiceId).subscribe(
        data => {
          this.router.navigate(['flashcards/flashcards']);
        },
        errors => {

        }
    );
  }

}

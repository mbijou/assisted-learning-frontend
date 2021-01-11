import { Component, OnInit } from '@angular/core';
import { SingleChoiceService } from '../single-choice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-single-choice',
  templateUrl: './delete-single-choice.component.html',
  styleUrls: ['./delete-single-choice.component.scss']
})
export class DeleteSingleChoiceComponent implements OnInit {

  constructor(
      private singleChoiceService: SingleChoiceService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
  ) { }

  singleChoiceId;

  ngOnInit(): void {
    this.singleChoiceId = this.activatedRoute.snapshot.params["id"];
    console.warn("ID: ", this.singleChoiceId);
  }

  deleteSingleChoice(){
    this.singleChoiceService.deleteSingleChoice(this.singleChoiceId).subscribe(
        data => {
          this.router.navigate(['flashcards/flashcards']);
        },
        errors => {

        }
    );
  }


}

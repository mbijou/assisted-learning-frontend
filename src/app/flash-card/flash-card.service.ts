import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface FlashCardSetInterface {
  flashcards: FlashCardInterface[];
}

export interface FlashCardInterface {
  id: number;
  question: string;
  deadline: any;
  workload: number;
  type: string;
  object_id: number;
  rank: number;
  answer_url: string;
  edit_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class FlashCardService {

  constructor(private http: HttpClient) { }

  user_id = localStorage.getItem("user_id");

  getRankOneFlashCards(){
    return this.http.get<FlashCardInterface[]>(`api/v1/users/${this.user_id}/flashcards/rank-one-flashcards/`);
  }

  getFlashCards(){
    return this.http.get<FlashCardInterface[]>(`api/v1/users/${this.user_id}/flashcards/`);
  }

}

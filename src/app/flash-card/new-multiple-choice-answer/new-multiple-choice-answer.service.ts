import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MultipleChoiceInterface } from '../edit-multiple-choice/edit-multiple-choice.service';


export interface MultipleChoiceAnswerSet {
  multiplechoicesolutionanswer_set: MultipleChoiceAnswerInterface[];
}

export interface MultipleChoiceAnswerInterface {
  id: number;
  answer: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class NewMultipleChoiceAnswerService {

  constructor(private http: HttpClient) { }

  getMultipleChoice(id){
    return this.http.get<MultipleChoiceInterface>(`api/v1/multiple-choices/${id}/`);
  }

  createNewMultipleChoiceAnswer(id, data: MultipleChoiceAnswerSet){
    return this.http.post<MultipleChoiceAnswerSet>(`api/v1/multiple-choices/${id}/answers/`, data);
  }

}

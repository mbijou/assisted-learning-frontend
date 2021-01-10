import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MultipleChoiceInterface } from '../edit-multiple-choice/edit-multiple-choice.service';


export interface MultipleChoiceAnswerSetInterface {
  multiplechoicesolutionanswer_set: MultipleChoiceAnswerInterface[];
}

export interface MultipleChoiceAnswerInterface {
  solution: number;
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

  createNewMultipleChoiceAnswer(id, data: MultipleChoiceAnswerSetInterface){
    return this.http.post<MultipleChoiceAnswerSetInterface>(`api/v1/multiple-choices/${id}/answers/`, data);
  }

}

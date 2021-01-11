import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface SingleChoiceInterface {
  question: string;
  workload: number;
  deadline: any;
  solution: boolean;
  user: number;
}

export interface SingleChoiceAnswerInterface {
  answer: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SingleChoiceService {

  constructor(private http: HttpClient) { }

  getSingleChoice(id){
    return this.http.get<SingleChoiceInterface>(`api/v1/single-choices/${id}/`);
  }

  createNewSingleChoice(data){
    return this.http.post<SingleChoiceInterface>("api/v1/single-choices/", data);
  }

  createNewSingleChoiceAnswer(id, data: SingleChoiceAnswerInterface){
    return this.http.post<SingleChoiceAnswerInterface>(`api/v1/single-choices/${id}/answers/`, data);
  }

  deleteSingleChoice(id){
    return this.http.delete(`api/v1/single-choices/${id}/`);
  }

}

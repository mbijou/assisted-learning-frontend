import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface MultipleChoiceInterface {
  question: string;
  workload: number;
  deadline: any;

  solution_set: SolutionInterface[];
}

export interface SolutionInterface{
  id: number;
  answer: string;
  solution: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EditMultipleChoiceService {

  constructor(private http: HttpClient) { }

  updateMultipleChoice(data, id){
    return this.http.put<MultipleChoiceInterface>("api/v1/multiple-choices/" + id + "/", data);
  }

  getMultipleChoice(id){
    return this.http.get<MultipleChoiceInterface>("api/v1/multiple-choices/" + id + "/");
  }

}

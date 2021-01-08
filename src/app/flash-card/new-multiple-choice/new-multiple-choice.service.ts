import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface MultipleChoiceInterface {
  question: string;
  workload: number;
  deadline: any;
  user: number;
  solution_set: SolutionInterface[];
}

export interface SolutionInterface{
  answer: string;
  solution: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class NewMultipleChoiceService {

  constructor(private http: HttpClient) { }

  createNewMultipleChoice(data){


    return this.http.post<MultipleChoiceInterface>("api/v1/multiple-choices/", data);
  }

}

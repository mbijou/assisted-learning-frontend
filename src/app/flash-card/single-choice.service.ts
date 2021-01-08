import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface SingleChoiceInterface {
  question: string;
  workload: number;
  deadline: any;
  solution: boolean;
  user: number;
}

@Injectable({
  providedIn: 'root'
})
export class SingleChoiceService {

  constructor(private http: HttpClient) { }

  getSingleChoices(id){
    return this.http.get<SingleChoiceInterface>(`api/v1/single-choices/${id}/`);
  }

  createNewSingleChoice(data){
    return this.http.post<SingleChoiceInterface>("api/v1/single-choices/", data);
  }

}

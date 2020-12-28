import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface SingleChoiceInterface {
  question: string;
  workload: number;
  deadline: any;
  solution: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NewSingleChoiceService {

  constructor(private http: HttpClient) { }

  getSingleChoices(){
    return this.http.get("api/v1/single-choices/");
    //return this.http.get<SingleChoiceInterface>("api/v1/single-choices/");
  }

  createNewSingleChoice(data){
    return this.http.post<SingleChoiceInterface>("api/v1/single-choices/", data);
  }

}

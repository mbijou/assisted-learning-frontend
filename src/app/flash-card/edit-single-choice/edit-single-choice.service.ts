import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SingleChoiceInterface } from "../new-single-choice/new-single-choice.service";
export { SingleChoiceInterface } from "../new-single-choice/new-single-choice.service";

@Injectable({
  providedIn: 'root'
})
export class EditSingleChoiceService {

  constructor(private http: HttpClient) { }

  updateSingleChoice(data, id){
    return this.http.put<SingleChoiceInterface>("api/v1/single-choices/" + id + "/", data);
  }
}

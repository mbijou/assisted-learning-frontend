import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SingleChoiceInterface } from "../single-choice.service";
export { SingleChoiceInterface } from "../single-choice.service";

@Injectable({
  providedIn: 'root'
})
export class EditSingleChoiceService {

  constructor(private http: HttpClient) { }

  getSingleChoice(id){
    return this.http.get<SingleChoiceInterface>("api/v1/single-choices/" + id + "/");
  }

  updateSingleChoice(data, id){
    return this.http.put<SingleChoiceInterface>("api/v1/single-choices/" + id + "/", data);
  }
}

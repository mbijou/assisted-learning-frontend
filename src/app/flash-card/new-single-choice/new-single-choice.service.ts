import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class NewSingleChoiceService {

  constructor(private http: HttpClient) { }

  getNewSingleChoice(){
    return this.http.get("api/v1/single-choices/");
  }
}

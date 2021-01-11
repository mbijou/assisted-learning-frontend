import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteMultipleChoiceService {

  constructor(
      private http: HttpClient
  ) { }

  deleteMultipleChoice(id){
    return this.http.delete(`/api/v1/multiple-choices/${id}/`);
  }
}

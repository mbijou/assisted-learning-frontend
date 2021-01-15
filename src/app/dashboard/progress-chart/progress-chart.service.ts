import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface ProgressChartInterface {
  amount_flashcards_total: number;
  amount_flashcards_done: number;
  amount_flashcards_open: number;
  amount_flashcards_expired: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressChartService {

  constructor(private http: HttpClient) { }

  get_users_and_accomplishments(id){
    return this.http.get<ProgressChartInterface>(`/api/v1/users/${id}/users-and-accomplishments/`);
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface RegistrationInterface {
  username: string,
  first_name: string,
  last_name: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
      private http: HttpClient,
  ) { }

  registerUser(data: RegistrationInterface){
    return this.http.post("/api/v1/users/registration/", data);
  }

}

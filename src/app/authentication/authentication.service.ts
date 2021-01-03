import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UserInterface {
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  email: string
}


export interface TokenInterface {
  token: string,
  user: UserInterface
}

export interface TokenErrorInterface {
  non_field_errors: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
      private http: HttpClient,
  ) { }

  isAuthenticated(){
    if(localStorage.getItem("token") && localStorage.getItem("user_id")){
      return true;
    }
  }

  generateToken(username, password){
    return this.http.post<TokenInterface>("/api/v1/api-token-auth/", {"username": username, "password": password});
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface TokenInterface {
  token: string,
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
    if(localStorage.getItem("token")){
      return true;
    }
    // TODO Token vorher abchecken
  }

  generateToken(username, password){
    return this.http.post<TokenInterface>("/api/v1/api-token-auth/", {"username": username, "password": password});
  }

}

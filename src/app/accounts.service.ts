import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  token: string = ""
  loggedIn: boolean = false
  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    this.loggedIn = false
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')

    return this.http.post(this.baseUrl + "/api-token-auth/", {username: username, password: password})
  }
}

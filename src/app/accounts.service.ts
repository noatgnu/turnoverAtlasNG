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
  username: string = ""
  currentHistory: string[] = []
  lastVisited: Date = new Date()

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    this.loggedIn = false
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')

    return this.http.post(this.baseUrl + "/api-token-auth/", {username: username, password: password})
  }

  logout() {
    this.loggedIn = false
    this.token = ""
    localStorage.removeItem("token")
    localStorage.removeItem("username")
  }

  saveHistory() {
    localStorage.setItem("history", JSON.stringify(this.currentHistory))
  }

  loadHistory() {
    const history = localStorage.getItem("history")
    if (history) {
      this.currentHistory = JSON.parse(history)
    }
  }

  addHistory(protein: string) {
    // add item into the start of history but keep max history length at 10
    if (this.currentHistory.includes(protein)) {
      this.currentHistory = this.currentHistory.filter(item => item !== protein)
    }

    this.currentHistory = [protein, ...this.currentHistory]
    this.currentHistory = this.currentHistory.slice(0, 30)
    this.saveHistory()
  }

  saveDate(date: Date) {
    localStorage.setItem("lastVisited", JSON.stringify(date))
  }

  loadLastVisited() {
    const current = new Date()
    const lastVisited = localStorage.getItem("lastVisited")
    if (lastVisited) {
      this.lastVisited = new Date(JSON.parse(lastVisited))
      this.saveDate(current)
    } else{
      this.lastVisited = current
      this.saveDate(current)
    }
  }
}

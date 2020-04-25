import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../model/user";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { Config } from "../config/config";

import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class UserService {
  jwtHelper = new JwtHelperService();

  isAuthenticated$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  login(user: User): Observable<User> {
    console.log("logging in user", user);
    return this.http.post<User>(Config.API_URL + "/users/login", user);
  }

  register(user: User): Observable<string> {
    console.log("registering user ", user);
    return this.http.post<string>(Config.API_URL + "/users/register", user);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../model/user";
import { Observable } from "rxjs";
import { Config } from "../config/config";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  login(user: User): Observable<User> {
    console.log("logging in user", user);
    return this.http.post<User>(Config.API_URL + "/users/login", user);
  }

  register(user: User): Observable<string> {
    console.log("registering user ", user);
    return this.http.post<string>(Config.API_URL + "/users/register", user);
  }
}

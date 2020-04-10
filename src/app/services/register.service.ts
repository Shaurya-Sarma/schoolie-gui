import { Injectable } from "@angular/core";
import { User } from "../model/user";

import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Config } from "../config/config";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(user: User): Observable<string> {
    console.log("registering user ", user);
    return this.http.post<string>(Config.API_URL + "/users/register", user);
  }
}

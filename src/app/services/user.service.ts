import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../model/user";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { Config, Configuration } from "../config/config";

import { JwtHelperService } from "@auth0/angular-jwt";
import { MatSidenav } from "@angular/material/sidenav";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  jwtHelper = new JwtHelperService();
  private api_url = "localhost:4000";
  public isInitialized = false;

  isAuthenticated$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  login(user: User): Observable<User> {
    return this.http.post<User>(Config.API_URL + "/users/login", user);
  }

  register(user: User): Observable<string> {
    return this.http.post<string>(Config.API_URL + "/users/register", user);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getConfig(): Observable<Configuration> {
    return this.http
      .get<Configuration>("/config")
      .pipe(
        tap(
          (c: Configuration) =>
            (this.api_url = c.api_url ? c.api_url : this.api_url)
        )
      );
  }

  public getApiUrl(): string {
    return this.api_url;
  }
}

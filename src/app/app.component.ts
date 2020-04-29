import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "./services/user.service";
import { Router, NavigationEnd } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "schoolie-gui";
  isAuthenticated$: BehaviorSubject<boolean>;
  private sidenav: MatSidenav;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    this.isAuthenticated$ = this.userService.isAuthenticated$;
    this.isAuthenticated$.next(this.userService.isAuthenticated());
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        console.log("router event ", e.url);
        if (e.url === "/login" || e.url === "/register") {
          this.isAuthenticated$.next(false);
        }
      }
    });
  }
}

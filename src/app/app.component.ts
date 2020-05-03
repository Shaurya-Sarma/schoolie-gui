import { Component, OnInit } from "@angular/core";
import { UserService } from "./services/user.service";
import { Router, NavigationEnd } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Configuration } from "./config/config";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "schoolie-gui";
  isAuthenticated$: BehaviorSubject<boolean>;
  isInitialized = false;
  opened: boolean = true;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    this.isAuthenticated$ = this.userService.isAuthenticated$;
    this.isAuthenticated$.next(this.userService.isAuthenticated());
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url === "/login" || e.url === "/register") {
          this.isAuthenticated$.next(false);
        }
      }
    });

    this.loadConfig();
  }

  loadConfig() {
    this.userService.getConfig().subscribe(
      (res: Configuration) => {
        this.isInitialized = true;
      },
      (error) => {
        this.isInitialized = true;
      }
    );
  }
}

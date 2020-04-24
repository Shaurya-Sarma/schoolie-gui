import { Component, OnInit } from "@angular/core";
import { UserService } from "./services/user.service";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "schoolie-gui";
  authenticated = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.authenticated = this.userService.isAuthenticated();
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        console.log("router event ", e.url);
        if (
          (e.url === "/login" || e.url === "/register") &&
          !!this.authenticated
        ) {
          this.router.navigate(["/home"]);
        }
      }
    });
  }
}

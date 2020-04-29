import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  // isMenuOpen: boolean = false;

  constructor(private router: Router, public userService: UserService) {}

  @Output()
  sideNavClicked = new EventEmitter<string>();

  toggleSidenav() {
    this.sideNavClicked.emit("");
    // this.isMenuOpen = !this.isMenuOpen;
  }

  redirect(link: string) {
    this.router.navigate([link]);
  }

  onLogout() {
    localStorage.removeItem("token");
    this.userService.isAuthenticated$.next(false);
    this.router.navigate(["/login"]);
  }

  ngOnInit() {}
}

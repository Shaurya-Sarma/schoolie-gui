import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public isMenuOpen: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  onSidenavClick(): void {
    this.isMenuOpen = false;
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

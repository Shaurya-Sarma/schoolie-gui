import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../services/login.service";
import { Router } from "@angular/router";
import { User } from "../model/user";
import { SnackbarService } from "../services/snackbar.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = false;
  isDisabled = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$"),
        ],
      ],
    });

    this.loginForm.valueChanges.subscribe(console.log);
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  onLogin() {
    this.isDisabled = true;
    const user = new User();
    user.email = this.email.value;
    user.password = this.password.value;
    this.error = false;
    this.loginService.login(user).subscribe(
      (res: User) => {
        console.log("output of login call ", res);
        localStorage.setItem("user", res.userName);
        localStorage.setItem("token", res.token);
        this.snackbarService.openSnackBar("Login Succesful!", {
          panelClass: "snackBar--success",
        });
        this.router.navigate(["/home"]);
      },
      (error) => {
        console.log("Error:", error);
        error.status === 401
          ? this.snackbarService.openSnackBar(
              "Invalid Password. Please try again",
              {
                panelClass: "snackBar--error",
                duration: 3000,
              }
            )
          : this.snackbarService.openSnackBar(
              "Authentication Failed.  Please try again",
              {
                panelClass: "snackBar--error",
                duration: 3000,
              }
            );
        this.error = true;
        this.isDisabled = false;
      }
    );
  }
}

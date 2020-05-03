import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { User } from "src/app/model/user";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$"),
        ],
      ],
      username: [
        "",
        [Validators.required, Validators.min(3), Validators.max(30)],
      ],
    });
  }

  get username() {
    return this.registerForm.get("username");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get("password");
  }

  onRegister() {
    const user = new User();
    user.email = this.email.value;
    user.password = this.password.value;
    user.userName = this.username.value;
    this.userService.register(user).subscribe(
      (res: string) => {
        this.snackbarService.openSnackBar("Registered Successfully!", {
          panelClass: "snackBar--success",
          duration: 3000,
        });
        this.router.navigate(["/login"]);
      },
      (error) => {
        error.status === 409
          ? this.snackbarService.openSnackBar(
              "Email already taken. Please try again",
              {
                panelClass: "snackBar--error",
                duration: 3000,
              }
            )
          : this.snackbarService.openSnackBar(
              "Registeration Failed. Please try again",
              {
                panelClass: "snackBar--error",
                duration: 3000,
              }
            );
        this.error = true;
      }
    );
  }
}

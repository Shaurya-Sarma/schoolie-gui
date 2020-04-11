import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../model/user";
import { Router } from "@angular/router";
import { SnackbarService } from "../services/snackbar.service";
import { UserService } from "../services/user.service";

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

    this.registerForm.valueChanges.subscribe(console.log);
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
        console.log("output of service call ", res);
        this.snackbarService.openSnackBar("Registered Successfully!", {
          panelClass: "snackBar--success",
        });
        this.router.navigate(["/login"]);
      },
      (error) => {
        console.log("error ", error);
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

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterService } from "../services/register.service";
import { User } from "../model/user";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

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
    private registerService: RegisterService,
    private router: Router,
    private snackBar: MatSnackBar
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

  openSnackBar(message: string, action: string, config: object) {
    this.snackBar.open(message, action, config);
  }

  onRegister() {
    const user = new User();
    user.email = this.email.value;
    user.password = this.password.value;
    user.userName = this.username.value;
    this.registerService.register(user).subscribe(
      (res: string) => {
        console.log("output of service call ", res);
        this.openSnackBar("Registered Successfully!", "✖", {
          panelClass: "snackBar--success",
        });
        this.router.navigate(["/login"]);
      },
      (error) => {
        console.log("error ", error);
        error.status === 409
          ? this.openSnackBar("Email already taken. Please try again", "✖", {
              panelClass: "snackBar--error",
            })
          : this.openSnackBar("Registeration Failed. Please try again", "✖", {
              panelClass: "snackBar--error",
            });
        this.error = true;
      }
    );
  }
}

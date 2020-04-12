import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { MatIconModule } from "@angular/material/icon";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";

import { MatCheckboxModule } from "@angular/material/checkbox";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";

import { AddTaskComponent } from "./add-task/add-task.component";
import { TokenInterceptor } from "./services/token.interceptor";
import { JwtModule } from "@auth0/angular-jwt";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  entryComponents: [AddTaskComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

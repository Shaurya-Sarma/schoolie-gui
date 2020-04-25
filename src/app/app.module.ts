import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { MatIconModule } from "@angular/material/icon";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";

import { MatCheckboxModule } from "@angular/material/checkbox";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";

import { AddTaskComponent } from "./components/add-task/add-task.component";
import { TokenInterceptor } from "./services/token.interceptor";
import { JwtModule } from "@auth0/angular-jwt";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { MatRippleModule } from "@angular/material/core";
import { DateComponent } from "./components/date/date.component";
import { TaskItemComponent } from "./components/task-item/task-item.component";
import { AddEventComponent } from "./components/add-event/add-event.component";
import { AddHolidayComponent } from "./components/add-holiday/add-holiday.component";
import { EventItemComponent } from "./components/event-item/event-item.component";
import { HolidayItemComponent } from "./components/holiday-item/holiday-item.component";
import { NotebookComponent } from "./components/notebook/notebook.component";
import { NotebookSidebarComponent } from "./components/notebook-sidebar/notebook-sidebar.component";
import { NotebookMainComponent } from "./components/notebook-main/notebook-main.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddTaskComponent,
    HeaderComponent,
    FooterComponent,
    CalendarComponent,
    DateComponent,
    TaskItemComponent,
    AddEventComponent,
    AddHolidayComponent,
    EventItemComponent,
    HolidayItemComponent,
    NotebookComponent,
    NotebookSidebarComponent,
    NotebookMainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatToolbarModule,
    MatRippleModule,
    MatSidenavModule,
    CKEditorModule,
  ],
  entryComponents: [AddTaskComponent, AddEventComponent, AddHolidayComponent],
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

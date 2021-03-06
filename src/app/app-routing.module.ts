import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { DateComponent } from "./components/date/date.component";
import { NotebookComponent } from "./components/notebook/notebook.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: "calendar",
    component: CalendarComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "calendar/:date",
    component: DateComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "notebook",
    component: NotebookComponent,
    canActivate: [AuthGuardService],
  },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

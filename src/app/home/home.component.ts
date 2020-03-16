import { Component, OnInit } from "@angular/core";
import { Task } from "./task";
import { TasksService } from "../services/tasks.service";
import { Day } from "./day";
import { Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  curDate = new Date();
  tasksForWeek = this.tasks.tasksForWeek();
  constructor(private tasks: TasksService) {}

  ngOnInit() {}
}

import { Component, OnInit } from "@angular/core";
import { Task } from "../model/task";
import { TasksService } from "../services/tasks.service";
import { Day } from "../model/day";
import { Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  userName: string;
  curDate = new Date();
  tasksForWeek = this.tasksService.tasksForWeek();

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.userName = localStorage.getItem("user");
  }
}

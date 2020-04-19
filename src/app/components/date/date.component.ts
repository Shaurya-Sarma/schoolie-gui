import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TasksService } from "src/app/services/tasks.service";
import { CalendarComponent } from "../calendar/calendar.component";
import { SnackbarService } from "src/app/services/snackbar.service";
import { Task } from "src/app/model/task";

@Component({
  selector: "app-date",
  templateUrl: "./date.component.html",
  styleUrls: ["./date.component.scss"],
})
export class DateComponent implements OnInit {
  date: Date;
  tasksForDay$ = {};

  constructor(
    private route: ActivatedRoute,
    public tasksService: TasksService,
    public snackbarService: SnackbarService
  ) {}

  deleteTask(task: Task) {
    this.tasksService.removeTask(task).subscribe(
      (res: string) => {
        console.log("task deleted");
        if (res) this.fetch();
        this.snackbarService.openSnackBar("Task Deleted Successfully!", {
          panelClass: "snackBar--success",
          duration: 2000,
        });
      },
      (err: string) => {
        console.log("error", err);
        this.snackbarService.openSnackBar(
          "Something happened. Please try again",
          {
            panelClass: "snackBar--error",
            duration: 2000,
          }
        );
      }
    );
  }

  updateTask(task: Task) {
    task.completed = !task.completed;
    this.tasksService.updateTask(task).subscribe(
      (res: string) => {
        console.log("update", res);
        this.snackbarService.openSnackBar("Task Updated Successfully!", {
          panelClass: "snackBar--success",
          duration: 1000,
        });
      },
      (err: string) => {
        console.log("err", err);
        this.snackbarService.openSnackBar("Update Failed.", {
          panelClass: "snackBar--error",
          duration: 1000,
        });
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.date = params["date"];
    });
    this.fetch();
    console.log(this.tasksForDay$);
  }

  fetch() {
    this.tasksForDay$ = this.tasksService.getTasksForDay(this.date);
  }
}

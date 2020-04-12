import { Component, OnInit } from "@angular/core";
import { TasksService } from "../services/tasks.service";
import { MatDialog } from "@angular/material/dialog";
import { AddTaskComponent } from "../add-task/add-task.component";
import { SnackbarService } from "../services/snackbar.service";
import { Day } from "../model/day";
import { Task } from "../model/task";

export interface DialogData {
  taskDate: Date;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  userName: string;

  curDate = new Date();
  daysForWeek$ = {};

  constructor(
    private tasksService: TasksService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  openDialog(day: Day): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: "300px",
      data: { taskDate: day.date },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.fetch();
    });
  }

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
    this.userName = localStorage.getItem("user");
    this.fetch();
  }

  fetch() {
    this.daysForWeek$ = this.tasksService.daysForWeek();
  }
}

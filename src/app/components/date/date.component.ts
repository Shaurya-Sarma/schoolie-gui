import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TasksService } from "src/app/services/tasks.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { Task } from "src/app/model/task";
import { MatDialog } from "@angular/material/dialog";
import { AddActivityComponent } from "../add-activity/add-activity.component";

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
    public snackbarService: SnackbarService,
    public dialog: MatDialog
  ) {}

  openDialog(date: Date): void {
    const dialogRef = this.dialog.open(AddActivityComponent, {
      width: "300px",
      data: { activityDate: date },
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

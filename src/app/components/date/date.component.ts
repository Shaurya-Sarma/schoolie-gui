import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TasksService } from "src/app/services/tasks.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { MatDialog } from "@angular/material/dialog";
import { AddTaskComponent } from "../add-task/add-task.component";

export interface DialogData {
  taskDate: Date;
}

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

  openDialogTask(date: Date): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: "300px",
      data: { taskDate: date },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.fetch();
    });
  }

  openDialogEvent(date: Date): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: "300px",
      data: { taskDate: date },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.fetch();
    });
  }

  openDialogHoliday(date: Date): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: "300px",
      data: { taskDate: date },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.fetch();
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.date = params["date"];
    });
    this.fetch();
  }

  fetch() {
    this.tasksForDay$ = this.tasksService.getTasksForDay(this.date);
  }
}

import { Component, OnInit } from "@angular/core";
import { TasksService } from "../services/tasks.service";
import { MatDialog } from "@angular/material/dialog";
import { AddTaskComponent } from "../add-task/add-task.component";
import { SnackbarService } from "../services/snackbar.service";
import { Day } from "../model/day";

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

  constructor(private tasksService: TasksService, public dialog: MatDialog) {}

  openDialog(day: Day): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: "300px",
      data: { taskDate: day.date },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.fetch();
    });
  }
  ngOnInit() {
    this.userName = localStorage.getItem("user");
    this.fetch();
  }

  fetch() {
    this.daysForWeek$ = this.tasksService.daysForWeek();
  }
}

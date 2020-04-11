import { Component, OnInit } from "@angular/core";
import { TasksService } from "../services/tasks.service";
import { MatDialog } from "@angular/material/dialog";
import { AddTaskComponent } from "../add-task/add-task.component";
import { SnackbarService } from "../services/snackbar.service";

export interface DialogData {
  taskName: string;
  taskSubject: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  userName: string;

  curDate = new Date();
  daysForWeek = this.tasksService.daysForWeek();

  taskName: string;
  taskSubject: string;

  constructor(
    private tasksService: TasksService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: "300px",
      data: { taskName: this.taskName, taskSubject: this.taskSubject },
    });
  }
  ngOnInit() {
    this.userName = localStorage.getItem("user");
  }
}

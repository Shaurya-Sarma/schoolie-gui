import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TasksService } from "src/app/services/tasks.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { MatDialog } from "@angular/material/dialog";
import { AddTaskComponent } from "../add-task/add-task.component";
import { AddEventComponent } from "../add-event/add-event.component";
import { AddHolidayComponent } from "../add-holiday/add-holiday.component";
import { EventsService } from "src/app/services/events.service";
import { Event } from "src/app/model/event";

export interface DialogDataActivity {
  activityDate: Date;
}

@Component({
  selector: "app-date",
  templateUrl: "./date.component.html",
  styleUrls: ["./date.component.scss"],
})
export class DateComponent implements OnInit {
  date: Date;
  tasksForDay$ = {};
  eventsForDay$ = {};
  holidaysForDay$ = {};

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private eventsService: EventsService
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
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: "300px",
      data: { activityDate: date },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.fetch();
    });
  }

  openDialogHoliday(date: Date): void {
    const dialogRef = this.dialog.open(AddHolidayComponent, {
      width: "300px",
      data: { activityDate: date },
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
    this.eventsForDay$ = this.eventsService.getEventsForDay(this.date);
  }

  deleteEvent(event: Event) {
    this.eventsService.removeEvent(event).subscribe(
      (res: string) => {
        console.log("event deleted");
        if (res) this.fetch();
        this.snackbarService.openSnackBar("Event Deleted Successfully!", {
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
}

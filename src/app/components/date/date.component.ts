import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TasksService } from "src/app/services/tasks.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { MatDialog } from "@angular/material/dialog";
import { AddTaskComponent } from "../add-task/add-task.component";
import { AddEventComponent } from "../add-event/add-event.component";
import { AddHolidayComponent } from "../add-holiday/add-holiday.component";
import { EventsService } from "src/app/services/events.service";
import { HolidaysService } from "src/app/services/holidays.service";

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
    private eventsService: EventsService,
    private holidaysService: HolidaysService
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
    console.log("tasks", this.tasksForDay$);
  }

  fetch() {
    this.tasksForDay$ = this.tasksService.getTasksForDay(this.date);
    this.eventsForDay$ = this.eventsService.getEventsForDay(this.date);
    this.holidaysForDay$ = this.holidaysService.getHolidaysForDay(this.date);
  }
}

import { Component, OnInit } from "@angular/core";
import { DateCell } from "src/app/model/date-cell";
import { CalendarService } from "src/app/services/calendar.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  curDate: Date;
  curMonth: string;
  daysOfWeek: string[] = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  dates: DateCell[] = [];

  renderCalendar() {
    this.curMonth = this.curDate.toLocaleString("default", { month: "long" });
    const firstDay: number = new Date(
      this.curDate.getFullYear(),
      this.curDate.getMonth()
    ).getDay();

    const endDate: number = new Date(
      this.curDate.getFullYear(),
      this.curDate.getMonth() + 1,
      0
    ).getDate();

    let arr: DateCell[] = [...Array(endDate).keys()].map((number) => {
      const dateCell = new DateCell();
      dateCell.date = new Date(
        this.curDate.getFullYear(),
        this.curDate.getMonth(),
        number + 1
      );
      return dateCell;
    });

    //* Adding Dates For Prev Month
    const prev = [];
    for (let i = firstDay; i > 0; i--) {
      const newDateCell = new DateCell();
      newDateCell.date = new Date(
        this.curDate.getFullYear(),
        this.curDate.getMonth(),
        1 - i
      );
      newDateCell.isCurrentMonth = false;
      prev.push(newDateCell);
    }
    arr = prev.concat(arr);
    //* Adding Dates For Next Month
    const next = [];
    for (let j = 42 - arr.length; j > 0; j--) {
      const newDateCell = new DateCell();
      newDateCell.date = new Date(
        this.curDate.getFullYear(),
        this.curDate.getMonth(),
        j
      );
      newDateCell.isCurrentMonth = false;
      next.push(newDateCell);
    }
    this.dates = arr.concat(next.reverse());

    this.calendarService.getDataForMonth(this.curDate).subscribe(
      (res) => {
        console.log("output:", res);
        res.forEach((dc) => {
          const dateCell = arr.find(
            (obj) =>
              new Date(obj.date).getTime() === new Date(dc.date).getTime()
          );
          if (dc.taskCount) {
            dateCell.taskCount = dc.taskCount;
          }
          if (dc.eventCount) {
            dateCell.eventCount = dc.eventCount;
          }
          if (dc.holidayCount) {
            dateCell.holidayCount = dc.holidayCount;
          }
        });
      },
      (err) => {
        console.log("error:", err);
      }
    );
  }

  changeDate(direction: string) {
    this.curDate.setMonth(
      direction === "prev"
        ? this.curDate.getMonth() - 1
        : this.curDate.getMonth() + 1
    );
    this.renderCalendar();
  }

  constructor(
    private calendarService: CalendarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.curDate = new Date();
    this.renderCalendar();
  }

  redirect(date: Date) {
    this.router.navigate(["/calendar/" + date.toISOString()]);
  }
}

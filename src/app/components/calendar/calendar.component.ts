import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DateCell } from "src/app/model/date-cell";

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

    const arr: DateCell[] = [...Array(endDate).keys()].map((number) => {
      const dateCell = new DateCell();
      dateCell.date = new Date(
        this.curDate.getFullYear(),
        this.curDate.getMonth(),
        number + 1
      );
      return dateCell;
    });

    //* Adding Dates For Prev Month
    for (let i = firstDay; i > 0; i--) {
      arr.unshift(new DateCell());
    }
    //* Adding Dates For Next Month
    for (let j = 42 - arr.length; j > 0; j--) {
      arr.push(new DateCell());
    }

    this.dates = arr;
  }

  changeDate(direction: string) {
    this.curDate.setMonth(
      direction === "prev"
        ? this.curDate.getMonth() - 1
        : this.curDate.getMonth() + 1
    );
    this.renderCalendar();
  }

  constructor() {}

  ngOnInit() {
    this.curDate = new Date();
    this.renderCalendar();
  }
}

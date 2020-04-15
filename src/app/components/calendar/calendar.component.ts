import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  curDate: Date = new Date();

  months: Array<string> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  daysOfWeek: Array<string> = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thurs",
    "Fri",
    "Sat",
  ];

  renderCalendar() {}
  firstDay: number = new Date(
    this.curDate.getFullYear(),
    this.curDate.getMonth()
  ).getDay();

  endDate: number = new Date(
    this.curDate.getFullYear(),
    this.curDate.getMonth() + 1,
    0
  ).getDate();

  dates: Array<any> = [...Array(this.endDate).keys()].map(
    (number) => number + 1
  );

  addOuterDates(arr: Array<any>) {
    //* Adding Dates For Prev Month
    for (let i = this.firstDay; i > 0; i--) {
      arr.unshift(" ");
    }
    //* Adding Dates For Next Month
    for (let j = 35 - arr.length; j > 0; j--) {
      arr.push(" ");
    }
  }

  changeDate(direction: string) {
    if (direction === "prev") {
      this.curDate.setMonth(this.curDate.getMonth() - 1);
    } else if (direction === "after") {
    }
  }

  constructor() {}

  ngOnInit() {
    this.addOuterDates(this.dates);
  }
}

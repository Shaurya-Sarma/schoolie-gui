import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  curDate: Date = new Date();

  // firstDay: number = new Date(
  //   this.curDate.getFullYear(),
  //   this.curDate.getMonth()
  // ).getDay();

  daysOfWeek: Array<string> = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thurs",
    "Fri",
    "Sat",
  ];

  endDate: number = new Date(
    this.curDate.getFullYear(),
    this.curDate.getMonth() + 1,
    0
  ).getDate();

  dates: Array<number> = [...Array(this.endDate).keys()].map(
    (number) => number + 1
  );

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

  constructor() {}

  ngOnInit() {}
}

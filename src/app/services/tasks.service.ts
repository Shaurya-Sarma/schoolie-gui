import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Day } from "../model/day";
import { Task } from "../model/task";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  constructor() {}

  getWeekDay(date: Date): string {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const dayNumber = date.getDay();
    return weekdays[dayNumber];
  }

  tasksForWeek(): Observable<Day[]> {
    // goal is to return Day[] of 7 items
    const daysOfWeek = [];
    let curDate = new Date();
    for (let i = 0; i < 7; i++) {
      const day = new Day();
      let nextDate = new Date(curDate);
      nextDate.setDate(nextDate.getDate() + i);
      day.date = nextDate;
      day.name = this.getWeekDay(nextDate);
      day.tasks = [];
      daysOfWeek.push(day);
    }

    return of(daysOfWeek);
  }
}

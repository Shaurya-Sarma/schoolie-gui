import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Day } from "../model/day";
import { Task } from "../model/task";
import { Config } from "../config/config";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  constructor(private http: HttpClient) {}

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

  daysForWeek(): Observable<Day[]> {
    // goal is to return Day[] of 7 items
    const daysOfWeek = [];
    let curDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    for (let i = 0; i < 7; i++) {
      const day = new Day();
      let nextDate = new Date(curDate);
      nextDate.setDate(nextDate.getDate() + i);
      day.date = nextDate;
      day.name = this.getWeekDay(nextDate);
      day.tasks$ = this.getTasksForDay(day.date);
      daysOfWeek.push(day);
    }

    return of(daysOfWeek);
  }

  getTasksForDay(day: Date): Observable<Task[]> {
    return this.http.get<Task[]>(Config.API_URL + "/tasks/by-day/" + day);
  }

  addTask(task: Task): Observable<string> {
    return this.http.post<string>(Config.API_URL + "/tasks/", task);
  }

  removeTask(task: Task): Observable<string> {
    return this.http.delete<string>(
      Config.API_URL + "/tasks/delete/" + task._id
    );
  }

  updateTask(task: Task): Observable<string> {
    return this.http.put<string>(Config.API_URL + "/tasks/", task);
  }
}

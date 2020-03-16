import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { Day } from "../home/day";
import { Task } from "../home/task";

@Injectable({
  providedIn: "root"
})
export class TasksService {
  constructor() {}

  tasksForWeek(): Observable<Day[]> {
    const dayOne = new Day();
    dayOne.name = "Monday";
    dayOne.date = new Date("03/15/2020");
    dayOne.tasks = [];
    const task1 = new Task();
    task1.date = dayOne.date;
    task1.name = "Finish Homework";
    task1.subject = "Math";
    dayOne.tasks.push(task1);

    const dayTwo = new Day();
    dayTwo.name = "Tuesday";
    dayTwo.date = new Date("03/16/2020");
    dayTwo.tasks = [];
    const task2 = new Task();
    task2.date = dayTwo.date;
    task2.name = "Finish Homework";
    task2.subject = "ELA";
    dayTwo.tasks.push(task2);

    const days = [dayOne, dayTwo];
    return from([days]);
  }
}

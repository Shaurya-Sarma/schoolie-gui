import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
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
    const task1b = new Task();
    task1b.date = dayOne.date;
    task1b.name = "Read Pages";
    task1b.subject = "Ela";
    dayOne.tasks.push(task1);
    dayOne.tasks.push(task1b);

    const dayTwo = new Day();
    dayTwo.name = "Tuesday";
    dayTwo.date = new Date("03/16/2020");
    dayTwo.tasks = [];
    const task2 = new Task();
    task2.date = dayTwo.date;
    task2.name = "Finish Homework";
    task2.subject = "ELA";
    // dayTwo.tasks.push(task2);

    const days = [dayOne, dayTwo];
    return of(days);
  }
}

import { Task } from "./task";
import { Observable } from "rxjs";

export class Day {
  name: string;
  date: Date;
  tasks$: Observable<Task[]>;
}

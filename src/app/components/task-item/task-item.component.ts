import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Task } from "src/app/model/task";
import { TasksService } from "src/app/services/tasks.service";
import { SnackbarService } from "src/app/services/snackbar.service";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.scss"],
})
export class TaskItemComponent implements OnInit {
  @Input()
  task: Task;

  @Output()
  change = new EventEmitter<string>();

  constructor(
    private tasksService: TasksService,
    private snackbarService: SnackbarService
  ) {}

  deleteTask(task: Task) {
    this.tasksService.removeTask(task).subscribe(
      (res: string) => {
        console.log("task deleted");
        if (res) this.change.emit("deleted");
        this.snackbarService.openSnackBar("Task Deleted Successfully!", {
          panelClass: "snackBar--success",
          duration: 2000,
        });
      },
      (err: string) => {
        console.log("error", err);
        this.snackbarService.openSnackBar(
          "Something happened. Please try again",
          {
            panelClass: "snackBar--error",
            duration: 2000,
          }
        );
      }
    );
  }

  updateTask(task: Task) {
    task.completed = !task.completed;
    this.tasksService.updateTask(task).subscribe(
      (res: string) => {
        console.log("update", res);
        if (res) this.change.emit("updated");
        this.snackbarService.openSnackBar("Task Updated Successfully!", {
          panelClass: "snackBar--success",
          duration: 1000,
        });
      },
      (err: string) => {
        console.log("err", err);
        this.snackbarService.openSnackBar("Update Failed.", {
          panelClass: "snackBar--error",
          duration: 1000,
        });
      }
    );
  }

  ngOnInit() {}
}

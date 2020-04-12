import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "../home/home.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Task } from "../model/task";
import { TasksService } from "../services/tasks.service";
import { SnackbarService } from "../services/snackbar.service";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.scss"],
})
export class AddTaskComponent {
  addTaskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private tasksService: TasksService,
    private snackbarService: SnackbarService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.addTaskForm = this.fb.group({
      taskName: ["", [Validators.required, Validators.maxLength(250)]],
      taskSubject: ["", [Validators.maxLength(30)]],
    });
  }

  get taskName() {
    return this.addTaskForm.get("taskName");
  }

  get taskSubject() {
    return this.addTaskForm.get("taskSubject");
  }

  createTask() {
    const task = new Task();
    task.name = this.taskName.value;
    task.subject = this.taskSubject.value;
    task.date = this.data.taskDate;
    this.tasksService.addTask(task).subscribe(
      (res: string) => {
        console.log("task created", res);
        this.dialogRef.close(true);
        this.snackbarService.openSnackBar("Added Task Successfully!", {
          panelClass: "snackBar--success",
          duration: 2000,
        });
      },
      (error: string) => {
        console.log("error", error);
        this.dialogRef.close(true);
        this.snackbarService.openSnackBar(
          "An error occured. Please try again",
          {
            panelClass: "snackBar--error",
            duration: 2000,
          }
        );
      }
    );
  }
}

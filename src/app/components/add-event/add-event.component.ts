import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SnackbarService } from "src/app/services/snackbar.service";
import { Event } from "src/app/model/event";
import { DialogDataActivity } from "../date/date.component";
import { EventsService } from "src/app/services/events.service";

@Component({
  selector: "app-add-event",
  templateUrl: "./add-event.component.html",
  styleUrls: ["./add-event.component.scss"],
})
export class AddEventComponent {
  addEventForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEventComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogDataActivity,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.addEventForm = this.fb.group({
      eventName: ["", [Validators.required, Validators.maxLength(250)]],
      eventLocation: ["", [Validators.maxLength(50)]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get eventName() {
    return this.addEventForm.get("eventName");
  }

  get eventLocation() {
    return this.addEventForm.get("eventLocation");
  }

  createEvent() {
    const event = new Event();
    event.name = this.eventName.value;
    event.location = this.eventLocation.value;
    event.date = this.data.activityDate;
    this.eventsService.addEvent(event).subscribe(
      (res: string) => {
        this.dialogRef.close(true);
        this.snackbarService.openSnackBar("Added Event Successfully!", {
          panelClass: "snackBar--success",
          duration: 2000,
        });
      },
      (error: string) => {
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

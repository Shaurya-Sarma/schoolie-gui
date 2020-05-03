import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Event } from "src/app/model/event";
import { SnackbarService } from "src/app/services/snackbar.service";
import { EventsService } from "src/app/services/events.service";

@Component({
  selector: "app-event-item",
  templateUrl: "./event-item.component.html",
  styleUrls: ["./event-item.component.scss"],
})
export class EventItemComponent implements OnInit {
  @Input()
  event: Event;

  @Output()
  change = new EventEmitter<string>();

  constructor(
    private snackbarService: SnackbarService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {}

  deleteEvent(event: Event) {
    this.eventsService.removeEvent(event).subscribe(
      (res: string) => {
        if (res) this.change.emit("event__deleted");
        this.snackbarService.openSnackBar("Event Deleted Successfully!", {
          panelClass: "snackBar--success",
          duration: 2000,
        });
      },
      (err: string) => {
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
}

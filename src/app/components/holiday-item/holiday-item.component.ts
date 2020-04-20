import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Holiday } from "src/app/model/holiday";
import { HolidaysService } from "src/app/services/holidays.service";
import { SnackbarService } from "src/app/services/snackbar.service";

@Component({
  selector: "app-holiday-item",
  templateUrl: "./holiday-item.component.html",
  styleUrls: ["./holiday-item.component.scss"],
})
export class HolidayItemComponent implements OnInit {
  @Input()
  holiday: Holiday;

  @Output()
  change = new EventEmitter<string>();

  constructor(
    private snackbarService: SnackbarService,
    private holidaysService: HolidaysService
  ) {}

  ngOnInit() {}

  deleteHoliday(holiday: Holiday) {
    this.holidaysService.removeHoliday(holiday).subscribe(
      (res: string) => {
        console.log("holiday deleted");
        if (res) this.change.emit("holiday__deleted");
        this.snackbarService.openSnackBar("Holiday Deleted Successfully!", {
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
}

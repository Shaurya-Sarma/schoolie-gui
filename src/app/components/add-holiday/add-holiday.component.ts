import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SnackbarService } from "src/app/services/snackbar.service";
import { HolidaysService } from "src/app/services/holidays.service";
import { DialogDataActivity } from "../date/date.component";
import { Holiday } from "src/app/model/holiday";

@Component({
  selector: "app-add-holiday",
  templateUrl: "./add-holiday.component.html",
  styleUrls: ["./add-holiday.component.scss"],
})
export class AddHolidayComponent implements OnInit {
  addHolidayForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddHolidayComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogDataActivity,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private holidaysService: HolidaysService
  ) {}

  ngOnInit() {
    this.addHolidayForm = this.fb.group({
      holidayName: ["", [Validators.required, Validators.maxLength(250)]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get holidayName() {
    return this.addHolidayForm.get("holidayName");
  }

  createHoliday() {
    const holiday = new Holiday();
    holiday.name = this.holidayName.value;
    holiday.date = this.data.activityDate;
    this.holidaysService.addHoliday(holiday).subscribe(
      (res: string) => {
        this.dialogRef.close(true);
        this.snackbarService.openSnackBar("Added Holiday Successfully!", {
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

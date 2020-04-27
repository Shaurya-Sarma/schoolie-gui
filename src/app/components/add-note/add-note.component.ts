import { Component, OnInit } from "@angular/core";
import { Note } from "src/app/model/note";
import { NotesService } from "src/app/services/notes.service";
import { MatDialogRef } from "@angular/material/dialog";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { SnackbarService } from "src/app/services/snackbar.service";

@Component({
  selector: "app-add-note",
  templateUrl: "./add-note.component.html",
  styleUrls: ["./add-note.component.scss"],
})
export class AddNoteComponent implements OnInit {
  addNoteForm: FormGroup;

  constructor(
    private notesService: NotesService,
    public dialogRef: MatDialogRef<AddNoteComponent>,
    private fb: FormBuilder,
    private snackbarService: SnackbarService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.addNoteForm = this.fb.group({
      noteTitle: ["", [Validators.required, Validators.maxLength(250)]],
    });
  }

  get noteTitle() {
    return this.addNoteForm.get("noteTitle");
  }

  createNote() {
    const note = new Note();
    note.name = this.noteTitle.value;
    note.data = "";
    note.date = new Date();
    this.notesService.addNote(note).subscribe(
      (res: string) => {
        console.log("note created", res);
        this.dialogRef.close(true);
        this.snackbarService.openSnackBar("Created Note Successfully!", {
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

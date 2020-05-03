import { Component, OnInit } from "@angular/core";
import { Note } from "src/app/model/note";
import { NotesService } from "src/app/services/notes.service";
import { MatDialogRef } from "@angular/material/dialog";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { SnackbarService } from "src/app/services/snackbar.service";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";

export interface Tag {
  name: string;
}

@Component({
  selector: "app-add-note",
  templateUrl: "./add-note.component.html",
  styleUrls: ["./add-note.component.scss"],
})
export class AddNoteComponent implements OnInit {
  addNoteForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [];

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

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  removeTag(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  get noteTitle() {
    return this.addNoteForm.get("noteTitle");
  }

  createNote() {
    const note = new Note();
    note.name = this.noteTitle.value;
    note.data = "";
    note.tags = Object.assign(this.tags);
    note.date = new Date();
    this.notesService.addNote(note).subscribe(
      (res: string) => {
        this.dialogRef.close(true);
        this.snackbarService.openSnackBar("Created Note Successfully!", {
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

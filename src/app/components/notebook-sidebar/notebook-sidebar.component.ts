import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NotesService } from "src/app/services/notes.service";
import { Note } from "src/app/model/note";
import { MatDialog } from "@angular/material/dialog";
import { AddNoteComponent } from "../add-note/add-note.component";
import { SnackbarService } from "src/app/services/snackbar.service";

@Component({
  selector: "app-notebook-sidebar",
  templateUrl: "./notebook-sidebar.component.html",
  styleUrls: ["./notebook-sidebar.component.scss"],
})
export class NotebookSidebarComponent implements OnInit {
  searchForm: FormGroup;
  value: string;
  notes$ = {};
  selectedNote: { id: string } = { id: "" };
  canDelete: boolean = false;

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  openDialogNote(): void {
    const dialogRef = this.dialog.open(AddNoteComponent, {
      width: "300px",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.fetch();
    });
  }

  ngOnInit() {
    this.searchForm = this.fb.group({});
    this.fetch();
  }

  fetch() {
    this.notes$ = this.notesService.getAllNotes();
  }

  onSelect(note: Note) {
    console.log("note selected ", note);
    this.selectedNote = { id: note._id };
    this.notesService.data$.next(note);
  }

  toggleDelete() {
    this.canDelete = !this.canDelete;
  }

  deleteNote(note: Note) {
    this.notesService.removeNote(note).subscribe(
      (res: string) => {
        console.log("note deleted");
        if (res) this.fetch();
        this.snackbarService.openSnackBar("Note Deleted Successfully!", {
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

import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NotesService } from "src/app/services/notes.service";
import { Note } from "src/app/model/note";
import { MatDialog } from "@angular/material/dialog";
import { AddNoteComponent } from "../add-note/add-note.component";
import { SnackbarService } from "src/app/services/snackbar.service";
import { Subscription, Observable } from "rxjs";

@Component({
  selector: "app-notebook-sidebar",
  templateUrl: "./notebook-sidebar.component.html",
  styleUrls: ["./notebook-sidebar.component.scss"],
})
export class NotebookSidebarComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  value: string;
  notes$: Observable<Note[]>;
  selectedNote: { id: string } = { id: null };
  canDelete: boolean = false;
  subscription: Subscription = new Subscription();
  searchTerm: string;

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  openDialogNote(): void {
    const dialogRef = this.dialog.open(AddNoteComponent, {
      width: "350px",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.fetch();
    });
  }

  ngOnInit() {
    this.searchForm = this.fb.group({});
    this.fetch();
    this.subscription.add(
      this.notesService.selectedNote$.subscribe(
        (n) => (this.selectedNote.id = !!n && !!n.id ? n.id : null)
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  fetch() {
    this.notes$ = this.notesService.getAllNotes();
  }

  onSelect(note: Note) {
    this.notesService.dataSub$.next(note);
  }

  toggleDelete() {
    this.canDelete = !this.canDelete;
  }

  deleteNote(note: Note) {
    this.notesService.removeNote(note).subscribe(
      (res: string) => {
        if (res) this.fetch();
        this.snackbarService.openSnackBar("Note Deleted Successfully!", {
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

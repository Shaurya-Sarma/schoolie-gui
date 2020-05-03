import { Component, OnInit, OnDestroy } from "@angular/core";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Note } from "src/app/model/note";
import { NotesService } from "src/app/services/notes.service";
import { Subscription } from "rxjs";
import { switchMap, filter } from "rxjs/operators";
import { SnackbarService } from "src/app/services/snackbar.service";

@Component({
  selector: "app-notebook-main",
  templateUrl: "./notebook-main.component.html",
  styleUrls: ["./notebook-main.component.scss"],
})
export class NotebookMainComponent implements OnInit, OnDestroy {
  note: Note = new Note();
  public Editor = ClassicEditor;
  subscription: Subscription = new Subscription();
  isSelected = false;

  public model = {
    editorData: "",
  };

  // public config = {
  //   placeholder: "Start Typing Here!",
  // };
  constructor(
    public notesService: NotesService,
    private snackbarService: SnackbarService
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.subscription.add(
      this.notesService.data$
        .pipe(
          filter((v) => v !== null),
          switchMap((n) => this.notesService.getDataForNote(n))
        )
        .subscribe((note: Note) => {
          if (note) {
            this.model.editorData = note.data;
            this.note = note;
          } else if (!!this.notesService.reloadEditor) {
            this.isSelected = false;
          }
        })
    );

    this.subscription.add(
      this.notesService.selectedNote$.subscribe(
        (n) => (this.isSelected = !!n && !!n.id ? true : false)
      )
    );
  }

  saveNote(note: Note) {
    note.data = this.model.editorData;
    this.notesService.updateNote(note).subscribe(
      (res: string) => {
        this.snackbarService.openSnackBar("Note Saved Successfully!", {
          panelClass: "snackBar--success",
          duration: 1000,
        });
      },
      (err: string) => {
        this.snackbarService.openSnackBar("Update Failed.", {
          panelClass: "snackBar--error",
          duration: 1000,
        });
      }
    );
  }
}

import { Component, OnInit, OnDestroy } from "@angular/core";
import * as DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { Note } from "src/app/model/note";
import { NotesService } from "src/app/services/notes.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { switchMap, filter } from "rxjs/operators";

@Component({
  selector: "app-notebook-main",
  templateUrl: "./notebook-main.component.html",
  styleUrls: ["./notebook-main.component.scss"],
})
export class NotebookMainComponent implements OnInit, OnDestroy {
  isSelected = false;
  note: Note = new Note();
  public Editor = DecoupledEditor;
  subsription: Subscription = new Subscription();

  public model = {
    editorData: "",
  };

  constructor(private notesService: NotesService) {}

  ngOnDestroy() {
    this.subsription.unsubscribe();
  }
  ngOnInit() {
    this.subsription.add(
      this.notesService.data$
        .pipe(
          filter((v) => v !== null),
          switchMap((n) => this.notesService.getDataForNote(n))
        )
        .subscribe((note: Note) => {
          console.log("note received ", note);
          this.isSelected = true;
          this.model.editorData = note.data;
          this.note = note;
        })
    );
  }

  public onReady(editor) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }

  // public config = {
  //   placeholder: "Start Typing Here!",
  // };

  createNote() {
    const note = new Note();
    note.name = "";
    note.data = this.model.editorData;
    note.date;
    this.notesService.addNote(note).subscribe((res: string) => {
      console.log("note created", res);
      //   this.dialogRef.close(true);
      //   this.snackbarService.openSnackBar("Added Task Successfully!", {
      //     panelClass: "snackBar--success",
      //     duration: 2000,
      //   });
      // },
      (error: string) => {
        console.log("error", error);
        // this.dialogRef.close(true);
        // this.snackbarService.openSnackBar(
        //   "An error occured. Please try again",
        //   {
        //     panelClass: "snackBar--error",
        //     duration: 2000,
        //   }
        // );
      };
    });
  }
}

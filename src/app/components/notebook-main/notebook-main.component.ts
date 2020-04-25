import { Component, OnInit } from "@angular/core";
import * as DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { Note } from "src/app/model/note";
import { NotesService } from "src/app/services/notes.service";

@Component({
  selector: "app-notebook-main",
  templateUrl: "./notebook-main.component.html",
  styleUrls: ["./notebook-main.component.scss"],
})
export class NotebookMainComponent implements OnInit {
  isSelected = false;

  public Editor = DecoupledEditor;

  constructor(private notesService: NotesService) {}

  ngOnInit() {}

  public onReady(editor) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }

  public model = {
    editorData: "",
  };

  // public config = {
  //   placeholder: "Start Typing Here!",
  // };

  getData() {
    console.log("DATA", this.model.editorData);
  }

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

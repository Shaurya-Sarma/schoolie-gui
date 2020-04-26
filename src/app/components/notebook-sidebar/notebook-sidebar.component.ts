import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NotesService } from "src/app/services/notes.service";
import { Note } from "src/app/model/note";

@Component({
  selector: "app-notebook-sidebar",
  templateUrl: "./notebook-sidebar.component.html",
  styleUrls: ["./notebook-sidebar.component.scss"],
})
export class NotebookSidebarComponent implements OnInit {
  searchForm: FormGroup;
  value: string;
  notes$ = {};

  constructor(private fb: FormBuilder, private notesService: NotesService) {}

  ngOnInit() {
    this.searchForm = this.fb.group({});
    this.fetch();
    console.log(this.notesService);
  }

  fetch() {
    this.notes$ = this.notesService.getAllNotes();
  }

  onSelect(note: Note) {
    console.log("note selected ", note);
    this.notesService.data$.next(note);
  }
}

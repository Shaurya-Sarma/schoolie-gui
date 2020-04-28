import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Config } from "../config/config";
import { Note } from "../model/note";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class NotesService {
  dataSub$: BehaviorSubject<Note> = new BehaviorSubject(null);
  data$: Observable<Note> = this.dataSub$.pipe(
    tap((note: Note) => {
      if (!!note) this.selectedNote$.next({ id: note._id });
    })
  );
  reloadEditor: boolean = false;

  selectedNote$: BehaviorSubject<{ id: string }> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(Config.API_URL + "/notes/");
  }

  addNote(note: Note): Observable<string> {
    return this.http.post<string>(Config.API_URL + "/notes/", note);
  }

  getDataForNote(note: Note): Observable<Note> {
    return this.http.get<Note>(Config.API_URL + "/notes/" + note._id);
  }

  updateNote(note: Note): Observable<string> {
    return this.http.put<string>(Config.API_URL + "/notes/", note);
  }

  removeNote(note: Note): Observable<string> {
    this.reloadEditor = true;
    return this.http.delete<string>(
      Config.API_URL + "/notes/delete/" + note._id
    );
  }
}

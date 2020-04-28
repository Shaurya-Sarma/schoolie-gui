import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Config } from "../config/config";
import { Note } from "../model/note";

@Injectable({
  providedIn: "root",
})
export class NotesService {
  data$: BehaviorSubject<Note> = new BehaviorSubject(null);

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
    return this.http.delete<string>(
      Config.API_URL + "/notes/delete/" + note._id
    );
  }
}

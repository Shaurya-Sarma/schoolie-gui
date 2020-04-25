import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Config } from "../config/config";
import { Note } from "../model/note";

@Injectable({
  providedIn: "root",
})
export class NotesService {
  constructor(private http: HttpClient) {}

  addNote(note: Note): Observable<string> {
    return this.http.post<string>(Config.API_URL + "/notes/", note);
  }
}

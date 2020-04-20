import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Event } from "../model/event";
import { HttpClient } from "@angular/common/http";
import { Config } from "../config/config";

@Injectable({
  providedIn: "root",
})
export class EventsService {
  constructor(private http: HttpClient) {}

  getEventsForDay(date: Date): Observable<Event[]> {
    return this.http.get<Event[]>(Config.API_URL + "/events/by-date/" + date);
  }

  addEvent(event: Event): Observable<string> {
    return this.http.post<string>(Config.API_URL + "/events/", event);
  }

  removeEvent(event: Event): Observable<string> {
    return this.http.delete<string>(
      Config.API_URL + "/events/delete/" + event._id
    );
  }
}

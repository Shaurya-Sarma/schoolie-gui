import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Config } from "../config/config";
import { Holiday } from "../model/holiday";

@Injectable({
  providedIn: "root",
})
export class HolidaysService {
  constructor(private http: HttpClient) {}

  getHolidaysForDay(date: Date): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(
      Config.API_URL + "/holidays/by-date/" + date
    );
  }

  addHoliday(holiday: Holiday): Observable<string> {
    return this.http.post<string>(Config.API_URL + "/holidays/", holiday);
  }

  removeHoliday(holiday: Holiday): Observable<string> {
    return this.http.delete<string>(
      Config.API_URL + "/holidays/delete/" + holiday._id
    );
  }
}

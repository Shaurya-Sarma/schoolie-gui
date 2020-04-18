import { Injectable } from "@angular/core";
import { DateCell } from "../model/date-cell";
import { Config } from "../config/config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CalendarService {
  constructor(private http: HttpClient) {}

  getDataForMonth(month: Date): Observable<DateCell[]> {
    return this.http.get<DateCell[]>(
      Config.API_URL + "/calendar/by-month/" + month
    );
  }
}

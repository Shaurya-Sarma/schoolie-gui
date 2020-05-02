import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url === "/config") {
      return next.handle(request);
    }

    request = request.clone({
      url: `${this.userService.getApiUrl()}${request.url}`,
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return next.handle(request);
  }
}

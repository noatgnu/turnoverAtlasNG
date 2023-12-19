import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AccountsService} from "./accounts.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private accounts: AccountsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add authorization header with token if available from accounts service
    if (this.accounts.token !== "" && !request.url.endsWith("/api-token-auth/")) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${this.accounts.token}`
        }
      });
    }
    return next.handle(request);
  }
}

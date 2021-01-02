import { Component, OnInit } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-header-interceptor',
  templateUrl: './add-header-interceptor.component.html',
  styleUrls: ['./add-header-interceptor.component.scss']
})
export class AddHeaderInterceptorComponent implements HttpInterceptor {

  constructor(
      private router: Router,
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!(localStorage.getItem("token"))){
      this.router.navigate(["/"]);
    }


    // TODO Benutzer einloggen, wenn kein Token da, dann auf login Seite weiterleiten -> Token erstellen
    // Clone the request to add the new header
    const clonedRequest = req.clone({ headers: req.headers.append('Authorization', 'Token 22231ea901aabf44efeab1295fa185adba5285c5') });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}

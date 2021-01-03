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

    let headers_data = {};

    if(!(localStorage.getItem("token")) || !(localStorage.getItem("user_id"))){
        this.router.navigate(["/pages/login"]);
    }else{
      let token = localStorage.getItem("token");
      headers_data = {headers: req.headers.append('Authorization', 'Token ' + token)};
    }

    // Clone the request to add the new header
    const clonedRequest = req.clone(headers_data);

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}

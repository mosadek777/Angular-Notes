import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

import { Observable, finalize } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private _ngxSpinner:NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    this._ngxSpinner.show()
    return next.handle(request).pipe(finalize(()=>{
      this._ngxSpinner.hide()
    }))
  }
}

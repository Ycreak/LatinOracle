import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

// Models
import { User } from './models/User';


import { EMPTY, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  ApiUrl: String = 'http://localhost:5002/'; // For development (http! not https)
  // ApiUrl: String = 'http://philips.nolden.biz:5002/'; // For deployment (http! not https)

//   _____ ______ _______ 
//   / ____|  ____|__   __|
//  | |  __| |__     | |   
//  | | |_ |  __|    | |   
//  | |__| | |____   | |   
//   \_____|______|  |_|   

  GetUsers(): Observable<JSON> {
    return this.http.get<JSON>(this.ApiUrl + 'GetUsers');
  }

  GetProjects(): Observable<JSON> {
    return this.http.get<JSON>(this.ApiUrl + 'GetProjects');
  }                                    

  GetOracle(): Observable<any> {
    return this.http.get<any>(this.ApiUrl + 'GetOracle');
  }

//   _____   ____   _____ _______ 
//  |  __ \ / __ \ / ____|__   __|
//  | |__) | |  | | (___    | |   
//  |  ___/| |  | |\___ \   | |   
//  | |    | |__| |____) |  | |   
//  |_|     \____/|_____/   |_|   

  CreateUser(user: User): Observable<any> {
    console.log(user)
    return this.http.post<any>(this.ApiUrl + 'CreateUser', user, { observe: 'response' })
  }
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor { 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
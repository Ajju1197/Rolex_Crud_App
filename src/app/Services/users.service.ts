import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { IUser } from '../Modals/IUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public serverUrl = 'https://jsonplaceholder.typicode.com';
  constructor(private _httpClient: HttpClient) { }

  getAllUsers(): Observable<IUser[]> {
    let dataUrl: string = `${this.serverUrl}/users`;
    return this._httpClient.get<IUser[]>(dataUrl).pipe(catchError(this.handleError), delay(500))
  }

  // Error Handling
  public handleError(error: HttpErrorResponse) {

    let errorMessage: any = 'error';

    if (error.error instanceof ErrorEvent) {

      // client-side error

      errorMessage = `Error: ${error.error.message}`;

    } else {

      // server-side error

      errorMessage = `Error Code: ${error.status} \nMessage: ${error.message}`;

    }

    // window.alert(errorMessage);

    return throwError(errorMessage);

  }

}

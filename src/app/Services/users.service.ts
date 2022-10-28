import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { IAlbums, IComments, IUser } from '../Modals/IUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public serverUrl = 'https://jsonplaceholder.typicode.com';
  public albumUrl = '../../assets/Albums/album.json';
  public postsUrl = 'https://prime.renonation.sg/api/posts';
  constructor(private _httpClient: HttpClient) { }

  getAllUsers(): Observable<IUser[]> {
    let dataUrl: string = `${this.serverUrl}/users`;
    return this._httpClient.get<IUser[]>(dataUrl).pipe(catchError(this.handleError), delay(1000))
  }

  getUser(userId: string): Observable<IUser> {
    let dataUrl: string = `${this.serverUrl}/users/${userId}`;
    return this._httpClient.get<IUser>(dataUrl).pipe(catchError(this.handleError), delay(1000))
  }
  getAllComments(): Observable<IComments[]> {
    let dataUrl: string = `${this.serverUrl}/comments`;
    return this._httpClient.get<IComments[]>(dataUrl).pipe(catchError(this.handleError))
  }
  getAllAlbums(): Observable<IAlbums[]> {
    let dataUrl: string = `${this.postsUrl}`;
    return this._httpClient.get<IAlbums[]>(dataUrl).pipe(catchError(this.handleError))
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

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { IAlbums, IComments, IUser } from '../Modals/IUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public serverUrl = 'https://jsonplaceholder.typicode.com';
  // public usersUrl = "../../assets/Users/user.json"
  public albumUrl = '../../assets/Albums/album.json';
  constructor(private _httpClient: HttpClient) { }


  /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getAllUsers(): Observable<IUser[]> {
    let dataUrl: string = `${this.serverUrl}/users`;
    return this._httpClient.get<IUser[]>(dataUrl).pipe(catchError(this.handleError), delay(1000))
  }

  getUser(userId: string): Observable<IUser> {
    let dataUrl: string = `${this.serverUrl}/users/${userId}`;
    console.log(dataUrl)
    return this._httpClient.get<IUser>(dataUrl).pipe(catchError(this.handleError), delay(1000))
  }

  createUser(user:IUser): Observable<any> {
  
    return this._httpClient.post(this.serverUrl + '/users/', JSON.stringify(user), this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }  
  updateUser(userId: string, user: IUser): Observable<IUser>{
    let dataUrl: string = `${this.serverUrl}/users/`;
    return this._httpClient.put<IUser>(dataUrl + userId,JSON.stringify(user),this.httpOptions).pipe(catchError(this.handleError))
  }

  deleteUser(userId: string): Observable<IUser> { 
    let dataUrl: string = `${this.serverUrl}/users/`;
    return this._httpClient.delete<IUser>(dataUrl + userId,this.httpOptions).pipe(catchError(this.handleError))
  }


  getAllComments(): Observable<IComments[]> {
    let dataUrl: string = `${this.serverUrl}/comments`;
    return this._httpClient.get<IComments[]>(dataUrl).pipe(catchError(this.handleError))
  }


  getAllAlbums(): Observable<IAlbums[]> {
    let dataUrl: string = `${this.albumUrl}`;
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

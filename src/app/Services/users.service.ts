import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { IAlbums, IComments, IUser } from '../Modals/IUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // public serverUrl = 'https://jsonplaceholder.typicode.com';
  public serverUrl = 'https://angularrolexapp-default-rtdb.firebaseio.com';
  // public usersUrl = "../../assets/Users/user.json"
  public albumUrl = 'assets/Albums/album.json';
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

  // Upload File

  public uploadfile(file: File) {
    let formParams = new FormData();
    formParams.append('file', file)
    return this._httpClient.post('https://angularrolexapp-default-rtdb.firebaseio.com/users.json', formParams)
  }

  getAllUsers(): Observable<IUser[]> {
    let dataUrl: string = `${this.serverUrl}/users.json`;
    return this._httpClient.get<IUser[]>('https://angularrolexapp-default-rtdb.firebaseio.com/users.json').pipe(map((res) => {
      const users = [];
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          users.push({...res[key],id:key});
        }
      }
      return users;
    }),delay(1000))
  }

  getUser(userId: string): Observable<IUser> {
    let dataUrl: string = `${this.serverUrl}/users/${userId}.json`;
    console.log(dataUrl)
    return this._httpClient.get<IUser>('https://angularrolexapp-default-rtdb.firebaseio.com/users/'+userId+'.json').pipe(catchError(this.handleError), delay(1000))
  }

  createUser(user:any): Observable<any> {
  
    let dataUrl: string = `${this.serverUrl}/users.json`;
    return this._httpClient.post('https://angularrolexapp-default-rtdb.firebaseio.com/users.json',user, this.httpOptions)
    .pipe(catchError(this.handleError))
  }  
  updateUser(userId: string, user: IUser): Observable<IUser>{
    let dataUrl: string = `${this.serverUrl}`;
    return this._httpClient.put<IUser>('https://angularrolexapp-default-rtdb.firebaseio.com/users/'+userId+'.json',JSON.stringify(user),this.httpOptions).pipe(catchError(this.handleError),delay(1000))
  }

  deleteUser(userId: string): Observable<IUser> { 
    let dataUrl: string = `${this.serverUrl}/users/${userId}.json`;
    return this._httpClient.delete<IUser>('https://angularrolexapp-default-rtdb.firebaseio.com/users/'+userId+'.json',this.httpOptions).pipe(catchError(this.handleError))
  }


  getAllComments(): Observable<IComments[]> {
    let dataUrl: string = `${this.serverUrl}/comments`;
    return this._httpClient.get<IComments[]>(dataUrl).pipe(catchError(this.handleError))
  }


  getAllAlbums(): Observable<IAlbums[]> {
    let dataUrl: string = `${this.albumUrl}`;
    return this._httpClient.get<IAlbums[]>(dataUrl).pipe(catchError(this.handleError),delay(1000))
  }
  getAlbum(albumId:string):Observable<IAlbums>{
    let dataUrl: string = `${this.albumUrl}/`;
    return this._httpClient.get<IAlbums>(dataUrl + albumId, this.httpOptions).pipe(catchError(this.handleError),delay(2000))
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

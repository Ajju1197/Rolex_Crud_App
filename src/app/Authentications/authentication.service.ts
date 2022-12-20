import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { apiConfig } from 'src/utils/config';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Subject } from 'rxjs';
// Modals
// import { authUser } from '../Modals/authUser.modal';
import { Auth } from '../Modals/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // user = new Subject<authUser>();
  
  constructor(private httpClient:HttpClient) { }


  // signUp(email, password):Observable<Auth>{
  //   return this.httpClient.post<Auth>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiConfig.API_KEY}`, {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true,
  //   }).pipe(catchError(this.handleError), tap(res => {
  //     this.authenticatedUser(res.email,res.localId,res.idToken,+res.expiresIn)
  //   }));
  // }
  
  // signIn(email, password) {
  //   return this.httpClient.post<Auth>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiConfig.API_KEY}`, {
  //     email: email,
  //     password: password,
  //     returnSecureToken:true,
  //   }).pipe(catchError(this.handleError),
  //   tap(res => {
  //       this.authenticatedUser(res.email,res.localId,res.idToken,+res.expiresIn)
  //   }))
  // }

  // private authenticatedUser(email, userId, token, expiresIn) {

  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new authUser(email, userId, token, expirationDate)
    
  //   console.log('user =>' + JSON.stringify(user));
  //   this.user.next(user)
  // }

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

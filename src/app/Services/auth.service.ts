import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';



/** Auth Service */ 
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  signUp(email:string,password:string) {
    return this.auth.createUserWithEmailAndPassword(email,password)
  }


  signIn(email:string,password:string) {
    return this.auth.signInWithEmailAndPassword(email,password)
  }
  

  getUser() {
    return this.auth.authState;
  }
  
  signOut() {
    return this.auth.signOut();
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from '@firebase/util';
import { Auth } from "../Modals/auth";



/** Auth Service */ 
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;


  constructor(private auth: AngularFireAuth,private db: AngularFireDatabase,private storage:AngularFireStorage) { 
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user',JSON.stringify(this.userData))
        JSON.parse(localStorage.getItem('user'))
      } else {
        localStorage.setItem('user',null)
        JSON.parse(localStorage.getItem('user'))
      }
    })
  }

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

  getImageUrl(path: string) {
    return this.storage.ref(path).getDownloadURL()
  }






}
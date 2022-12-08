import { Injectable } from '@angular/core';
// import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireList, AngularFireObject } from '@angular/fire/compat/database';



/** Auth Service */ 
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  instaPostsRef: AngularFireList<any>;
  instaPostRef: AngularFireObject<any>;

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

    // Update Student Object
    UpdateStudent(user: any) {
      this.instaPostRef.update({
      id: user.id,
      locationName: user.locationName,
      description: user.description,
      picture: user.picture,
      by: user.user.name,
      instaId: user.user.instaId,
      date: Date.now(),
      });
  }
  
  //AngularFirebase image upload?
  





}
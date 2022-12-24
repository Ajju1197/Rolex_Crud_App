import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class InstapostService {

  constructor(private auth: AngularFireAuth) { }
  
  createPost(email: string, name: string) {
    return this.auth.createUserWithEmailAndPassword(email, name)
  }

  // updatePost(email: string, password: string) {
  //   return this.auth.updateCurrentUser(email, password)
  // }

  getPost() {
    return this.auth.authState;
  }

  

}

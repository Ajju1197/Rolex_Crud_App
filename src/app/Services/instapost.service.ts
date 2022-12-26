import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class InstapostService {

  constructor(private auth: AngularFireAuth,private afdb:AngularFireDatabase) { }
  
  createPost(email: string, name: string) {
    return this.auth.createUserWithEmailAndPassword(email, name)
  }

  // updatePost(email: string, password: string) {
  //   return this.auth.updateCurrentUser(email, password)
  // }

  getPost() {
    return this.auth.authState;
  }

  updateSinglePost(itemId, data) {
    return this.afdb.object('/post/' + itemId).update(data);
  }


}

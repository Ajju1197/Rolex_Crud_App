import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) { }

  createPhotos(data) {
    return this.db.list('/photos').push(data);
  }

  getAll() {
    return this.db.list('/photos').snapshotChanges();
  }

  get(itemId) {
    return this.db.object('/items/' + itemId).valueChanges();
  }

  update(itemId, data) {
    return this.db.object('/items/' + itemId).update(data);
  }

  delete(itemId) {
    return this.db.object('/items/' + itemId).remove();
  }

  
}

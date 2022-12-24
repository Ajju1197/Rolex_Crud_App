import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) { }

  create(data) {
    return this.db.list('/items').push(data);
  }

  getAll() {
    return this.db.list('/items').snapshotChanges();
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

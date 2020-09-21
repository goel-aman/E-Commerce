import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Cat } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: Observable<any[]>;
  constructor(
    public afs: AngularFirestore,
    private db: AngularFireDatabase) {
  }

  getCategories() {
    return this.db.list('/categories', ref =>
      ref.orderByChild('name')).snapshotChanges();
  }
}
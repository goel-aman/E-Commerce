import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Item } from './models/app-user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;
  constructor(
    public afs: AngularFirestore,
    private db: AngularFireDatabase) {

    this.itemsCollection = this.afs.collection('products', ref => ref.orderBy('price', 'asc'));
    this.items = this.itemsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  create(product) {
    this.itemsCollection.add(product);
  }

  // create(product){
  //   this.afs.doc('/products').set(product);
  //   this.db.list('/products').push(product);
  // }

  deleteItem(item: Item) {
    this.itemDoc = this.afs.doc(`products/${item.id}`);
    this.itemDoc.delete();
  }

  getItems() {
    return this.items;
  }

  updateItem(item){
    this.itemDoc = this.afs.doc(`products/${item.id}`);
    this.itemDoc.update(item);
  }

  getAll() {
    return this.db.list('/products');
  }

  get(productId) {
    return this.afs.collection('/products/' + productId).valueChanges();
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}






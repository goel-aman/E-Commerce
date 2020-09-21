import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Item } from './models/app-user';
import { take } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase ) { }

  private create(){
   return  this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
  
  async getCart() : Promise<AngularFireObject<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+cartId);
  }

  public async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(!cartId){
      let result = await this.create();
      localStorage.setItem('cartId',result.key);
      return result.key
    }
      return cartId;
  }

  async addToCart(product: Item){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/'+cartId+'/items/'+product.id);
    item$.snapshotChanges().
     pipe(take(1))
     .subscribe(i => {
     item$.update({
       product: product,
       quantity: ((i.payload.hasChild('quantity')) ? i.payload.val()['quantity']+1: 1)
     });
    });
  }

  async removeFromCart(product: Item){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/'+cartId+'/items/'+product.id);
    item$.snapshotChanges().
     pipe(take(1))
     .subscribe(i => {
     item$.update({
       product: product,
       quantity: ((i.payload.hasChild('quantity')) ? i.payload.val()['quantity']-1: 0)
     });
    });
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+ cartId + '/items').remove();
  }
}

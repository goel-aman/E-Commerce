import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Item } from '../models/app-user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit,OnDestroy {
  cart$;
  cart;
  subscription: Subscription;
  totalprice;
  itemCount:number;
  arr = [];
  shoppingCartItemCount;
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit(){
    // this.cart$ = await this.shoppingCartService.getCart();
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.valueChanges().subscribe(cart => {
      // this.arr.splice(0,this.itemCount);
      this.shoppingCartItemCount = 0;
      this.itemCount = 0;
      if(cart != null){
        this.arr= [];
        for(let productId in cart.items){
          this.arr.push({product: cart.items[productId].product,quantity:cart.items[productId].quantity })
          this.shoppingCartItemCount += cart.items[productId].quantity;
          this.itemCount++;
        }
     }
    });
    this.subscription = (await this.shoppingCartService.getCart()).snapshotChanges().subscribe(cart => {
      this.cart = cart.payload.val()}); 
  }
  rando(){
   this.arr.splice(0,this.arr.length-this.itemCount);
  }
  totalpricex(){
    this.totalprice = 0;
    for(var i=0;i<this.arr.length;i++){
      this.totalprice+= this.arr[i].product.price * this.arr[i].quantity;
    }
    return this.totalprice;
  }

  clearCart(){
    this.arr = [];
    this.shoppingCartService.clearCart();
  }

  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

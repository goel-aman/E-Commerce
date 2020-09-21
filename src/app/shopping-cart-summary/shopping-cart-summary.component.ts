import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit,OnDestroy {
  @Input('cart') cart: any;
  cart$;
  shoppingCartItemCount;
  itemCount;
  arr = [];
  totalItemCount = 0;
  subscription: Subscription;
  constructor(private shoppingCartService:ShoppingCartService) { }

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

  xyz() {
    // let count = 0;
    // this.totalItemCount = 0;
    // this.cart = this.cart || {product:{},quantity: 0};
    // if (this.cart != {}) {
    //   this.arr = [];
    //   for (let productId in this.cart.items) {
    //     if (productId != null) {
    //       this.arr.push({ product: this.cart.items[productId].product, quantity: this.cart.items[productId].quantity })
    //       this.totalItemCount += this.cart.items[productId].quantity;
    //       count++;
    //     }
        
    //   }
    // }
    // this.arr = this.arr.slice(count,this.totalItemCount - count);
  }

  totalpricex(){
    let totalprice = 0;
    for(var i=0;i<this.arr.length;i++){
      totalprice +=  this.arr[i].product.price * this.arr[i].quantity;
    }
    return totalprice;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

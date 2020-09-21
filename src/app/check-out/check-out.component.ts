import { CheckoutService } from './../checkout.service';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
// import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy{
  userId:string;
  shipping = {name:"",city:"",addressLine2:"",addressLine1:""}; 
  cart$;
  purchaseStarted:Boolean = false;
  cart;
  subscription:Subscription;
  UserSubscription: Subscription;


  constructor(
    private router: Router,
    private authService:AuthService,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private checkout: CheckoutService) { }


  
  async ngOnInit(): Promise<void> {
    let cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.valueChanges().subscribe(cart => {
      this.cart = cart;
    });
    this.UserSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {

    this.purchaseStarted = true;

    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items
    }

    let cartId = await this.shoppingCartService.getOrCreateCartId();
    this.checkout.startCourseCheckoutSession(cartId)
    .subscribe(() => {
      console.log("Stripe checkout session initialized ... ");
    },
    err => {
      console.log("Error creating checkout session",err);
      this.purchaseStarted = false;
    });

    
    let result = await this.orderService.storeOrder(order);
    //this.router.navigate(['/order-success',result.key]);
   
  }  

  ngOnDestroy (){
    this.subscription.unsubscribe();
    this.UserSubscription.unsubscribe();
  }

}


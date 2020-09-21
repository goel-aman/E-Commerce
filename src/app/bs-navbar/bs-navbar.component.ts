import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser: AppUser;
  shoppingCartItemCount: number = 0;
  constructor(public auth:AuthService,private shoppingCartService: ShoppingCartService) {

  }
  logout(){
    this.auth.logout();
  }
  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;
      if(cart != null){
        for(let productId in cart.items){
          this.shoppingCartItemCount += cart.items[productId].quantity;
        }
      }
    });
  }

}

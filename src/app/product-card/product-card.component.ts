import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Item;
  @Input('shopping-cart') shoppingCart;
  constructor
  (private cartService: ShoppingCartService) { }


  addToCart(product: Item){
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Item){
    this.cartService.removeFromCart(product);
  }

  getQuantity(){
    if(!this.shoppingCart) return 0;
    let item = null;
    if(this.shoppingCart.items != null && this.shoppingCart.items != undefined){
      item = this.shoppingCart.items[this.product.id];
    }
    return (item ? item.quantity: 0);
  }

  ngOnInit(): void {

  }

}

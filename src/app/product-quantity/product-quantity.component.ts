import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
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

    let item = this.shoppingCart.items[this.product.id];
    return (item ? item.quantity: 0);
  }
}

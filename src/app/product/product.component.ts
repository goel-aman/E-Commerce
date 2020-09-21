import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,OnDestroy {
  products$;
  cart: any;
  products: Item[] = [];
  filteredProducts: Item[] = [];
  category: string;
  subscription: Subscription;
  constructor(route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) {

      

    this.products$ = productService.getItems();
    productService.getItems().subscribe(products => {
      this.products = products
      
      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });


    });

  }

  async ngOnInit(){
    this.subscription = (await this.shoppingCartService.getCart()).snapshotChanges().subscribe(cart => {
      this.cart = cart.payload.val()});
    }
  

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

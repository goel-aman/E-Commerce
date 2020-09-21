import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Observable, Subscription } from 'rxjs';
import { snapshotChanges, AngularFireObject } from 'angularfire2/database';
import { AngularFireDatabase } from '@angular/fire/database';
import { Item, Cat } from 'src/app/models/app-user';
import { CategoryService } from 'src/app/category.service';
//import { Item } from '../../product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  items: Item[];
  editState: boolean = false;
  itemToEdit: Item;
  products:any[];
  filteredItem: any[];
  filteredProducts: any[];
  subscription: Subscription;
  products$;
  products1$;
  categories;
  constructor(
    private categoryServie: CategoryService,
    db: AngularFireDatabase,
    private productService: ProductService,
    ) { 
      this.subscription = this.productService.getAll().valueChanges().subscribe(products => this.products = this.filteredProducts= products); 

      // this.products$ = this.productService.getAll();
      this.products$ = this.productService.getAll().valueChanges();
      this.products1$ = this.productService.getAll().snapshotChanges();
      this.categories = this.categoryServie.getCategories();
    
}

  ngOnInit(): void {
    this.productService.getItems().subscribe(items => {
      this.items = this.filteredItem =  items;
    });
    // this.categoryServie.getCategories().subscribe(items =>{
    //   this.categories = items;
    // });
      // console.log(items);
 
  }

  editItem(event,item){
    this.editState = true;
    this.itemToEdit = item;
  }

  filter(query: string){
    // this.filteredProducts = (query) ? 
    // this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())): 
    // this.products;
    this.filteredItem = (query) ? 
    this.items.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
    this.items;

  }

  clearState(){
    this.editState = false;
    this.itemToEdit = null;
  }

  updateItem(item){
    this.productService.updateItem(item);
    this.clearState();
  }

  deleteItem(event,item){
    this.clearState();
    this.productService.deleteItem(item);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
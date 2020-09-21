import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { CategoryService } from '../category.service';
// import 'rxjx/add/operator/take'; 
@Component({
  selector: 'app-product-form-edit',
  templateUrl: './product-form-edit.component.html',
  styleUrls: ['./product-form-edit.component.css']
})
export class ProductFormEditComponent implements OnInit {
  categories$;
  product;
  id;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
  ) { 
    this.categories$ = categoryService.getCategories();
    
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
  }


  saveup(product){
    this.productService.update(this.id,product);
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(confirm('Are you sure you want to delete this product? ')){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

  ngOnInit(): void {
  }

}

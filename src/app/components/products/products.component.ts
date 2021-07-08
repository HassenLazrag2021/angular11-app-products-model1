import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product.model';
import {ProductService} from '../../services/product.service';
import {fromEvent, interval, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$:Observable<Product[]>|null=null;
  constructor(private productService:ProductService, private router:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
   this.products$= this.productService.getAllProducts();

  }

  onGetSelectedProducts() {
    this.products$= this.productService.getSelectedProducts();

  }

  onGetAvailableProducts() {
    this.products$= this.productService.getAvailableProducts().pipe(
      data=>{return data;}
    );
  }
  // Fonction de recherche
  onSearchProducts(dataForm:any){
    this.products$= this.productService.searchProducts(dataForm.keyword).pipe(
      data=>{ return data; }
    );
  }
  onSelect(p: Product) {
    this.productService.select(p);
  }
  onDelete(p:Product){
    let v=confirm("Etes vous sure de vouloir supprmier");
    if(v==true)
      this.productService.deleteProduct(p)
        .subscribe(data=>{
          this.onGetAllProducts();
        });
  }
  onNewProduct() {
    this.router.navigateByUrl("/newProduct");
  }

  // Edit d'un produit
  onEdit(product:Product){
    this.router.navigateByUrl("/editProduct/"+product.id);
  }

}

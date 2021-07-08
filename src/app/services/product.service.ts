import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../model/product.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({providedIn:'root'})
export class ProductService{
  constructor(private http:HttpClient) {
  }

  getAllProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host +"/products");
  }

  getSelectedProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host +"/products?selected=true");
  }

  // Méthode de recuperation de tous les produits available =true
  getAvailableProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host +"/products?available=true");
  }

  // Methode de recherche des produits par mot cle
  searchProducts(keyword:string):Observable<Product[]>{
    let host= environment.host;
    return this.http.get<Product[]>(host+"/products?name_like="+keyword);
  }

  // Selectionner un etat selected ou unselected
  select(product:Product):Observable<void>{
    let host= environment.host;
    product.selected=!product.selected;
    return this.http.put<void>(host+"/products/"+product.id,product);
  }

  deleteProduct(product:Product):Observable<void>{
    let host= environment.host;
    return this.http.delete<void>(host+"/products/"+product.id);
  }
// Enregistrer un produit dans la base
  save(product:Product):Observable<Product>{
    let host= environment.host;
    return this.http.post<Product>(host+"/products",product);
  }

  getProduct(id:number):Observable<Product>{
    let host= environment.host;
    return this.http.get<Product>(host+"/products/"+id);
  }

  // update un produit pa son id
  updateProduct(product:Product):Observable<Product>{
    let host= environment.host;
    return this.http.put<Product>(host+"/products/"+product.id, product);
  }

}

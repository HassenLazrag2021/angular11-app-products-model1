import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productID!: number;
  productFormGroup!: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
              private productsService: ProductService,
              private fb: FormBuilder) {
    this.productID = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productsService.getProduct(this.productID)
      .subscribe(product => {
        this.productFormGroup = this.fb.group({
          id: [product.id, Validators.required],
          name: [product.name, Validators.required],
          price: [product.price, Validators.required],
          quantity: [product.quantity, Validators.required],
          selected: [product.selected, Validators.required],
          available: [product.available, Validators.required]
        })
      });
  }
  onUpdateProduct(){
    this.productsService.updateProduct(this.productFormGroup.value)
      .subscribe(data=>{
        alert("Success Product updated");
      });
  }
}

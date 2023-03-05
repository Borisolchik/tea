import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy{
  product: ProductType;
  private subscriptionProduct: Subscription | null = null;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private router: Router) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    }
  }

  ngOnInit() {
    this.subscriptionProduct = this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.productService.getProduct(+params['id'])
          .subscribe({
            next:(data) => {
              this.product = data;
            },
            error: (error) => {
              this.router.navigate(['/']);
            }
          });
      }
    })
  }
  ngOnDestroy() {
    this.subscriptionProduct?.unsubscribe();
  }

}

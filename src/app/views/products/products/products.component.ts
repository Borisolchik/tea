import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {ProductType} from "../../../../types/product.type";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy{
  private subscriptionProducts: Subscription | null = null;
  constructor(private productService: ProductService) {

  }
  public products: ProductType[] = [];
  public loading: boolean = false;

  ngOnInit() {
    this.loading = true;
    this.subscriptionProducts = this.productService.getProducts()
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log('next');
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  ngOnDestroy() {
    this.subscriptionProducts?.unsubscribe();
  }


}

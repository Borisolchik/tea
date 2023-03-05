import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../shared/services/product.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {CartService} from "../../shared/services/cart.service";
import {FormBuilder, Validators} from "@angular/forms";
import {CustomValidators} from "../../shared/custom-validators";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  public showError = false;
  public formShow = true;
  public checkoutForm = this.fb.group({
    name: ['', [Validators.required, CustomValidators.nameValidator]],
    last_name: ['', [Validators.required, CustomValidators.nameValidator]],
    phone: ['', [Validators.required, CustomValidators.phoneValidator]],
    country: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    product: ['', [Validators.required]],
    address: ['', [Validators.required, CustomValidators.addressValidator]],
    comment: [''],
  });
  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  constructor(private cartService: CartService, private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.subscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['product']) {
        this.checkoutForm.patchValue ({
          product: params['product']
        })
      }
    })

  }

  public ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

  public createOrder() {
    console.log(this.checkoutForm.value);
    this.subscriptionOrder = this.productService.createOrder(this.checkoutForm.value)
      .subscribe(response => {
        if (response.success && !response.message) {
          this.formShow = false;
          this.checkoutForm.reset()
        } else {
          this.showError = true;
        }
      })
  }
}

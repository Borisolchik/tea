import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../../../types/product.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.site/tea');
  }
  getProduct(id: number): Observable<ProductType>{
    return this.http.get<ProductType>(`https://testologia.site/tea?id=${id}`);
  }
  createOrder(data: any) {
    return this.http.post<{ success: number, message?: string }>(`https://testologia.site/order-tea`, data);
  }
}

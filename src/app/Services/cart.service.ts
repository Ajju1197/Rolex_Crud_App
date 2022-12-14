import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '@firebase/util';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  constructor(private httpClient:HttpClient) { }
  
  public cartApi = 'https://fakestoreapi.com/products/';
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  getAllProducts(){
    return this.httpClient.get<any>(this.cartApi)
      .pipe(map(res => {
        return res
    }))
  }

  getProducts() {
    return this.productList.asObservable();
  }

  setProducts(product:any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product:any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice():number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal;
  }

  removeCartItem(product:any) {
    this.cartItemList.map((a: any,index:any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    })
  }


  removeAllCartItems() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList)
  }



}

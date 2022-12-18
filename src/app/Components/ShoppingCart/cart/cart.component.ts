import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Services/cart.service';
import { CommonService } from 'src/app/shared/sharedServices/common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnDestroy {

  productList: any = [];
  public grandTotal: number = 0;
  loading: boolean = false;
  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router,
    private commonService:CommonService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.cartService.getProducts().subscribe((data) => {
      this.productList = data;
      this.loading = false;
    });
    this.grandTotal = this.cartService.getTotalPrice();

    this.commonService.gobackLink.next({ text: 'Back to Shopping', url: '/admin/products' })
    this.commonService.goToCart.next({text:'',url:''})
  }
  
  removeItem(item: any) {
    this.loading = true;
    this.cartService.removeCartItem(item);
    this.loading = false;
    this.toastr.success(item.title + 'Was Successfully Deleted')
  }

  emptycart(){
    this.cartService.removeAllCartItems();
    this.toastr.success('All Products Successfully Deleted')
  }

  goToProductsPage() {
    this.loading = true;
    this.router.navigateByUrl('/admin/products');
    this.loading = false;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.commonService.gobackLink.next({text:'',url:''})
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productList: any = [];
  public grandTotal: number = 0;
  loading: boolean = false;
  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.cartService.getProducts ().subscribe((data) => {
      this.productList = data;
      this.grandTotal = this.cartService.getTotalPrice();
      this.loading = false;
    })
  }

  removeItem(item: any) {
    this.loading = true;
    setTimeout(() => {
      this.cartService.removeCartItem(item);
    }, 1000);
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
}

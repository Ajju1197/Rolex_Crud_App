import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/appServices/cart.service';
import { CommonService } from 'src/app/shared/sharedServices/common.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit,OnDestroy {

  id;
  product;
  loading: boolean = true;
  totalItem: number = 0;
  goToCart;
  darkTheme: boolean = false;
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private commonService:CommonService,
  ) { 
    
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('productId')
    })
    if (this.id) {
      this.loading = true;
      this.cartService.getProduct(this.id).subscribe((data) => {
        this.product = data;
        this.loading = false;
        Object.assign(this.product, { quantity: 1, total: this.product.price })
      })
    }

    this.cartService.getProducts().subscribe((data) => {
      this.totalItem = data.length;
    })

    this.commonService.goToCart.next({ text: 'Go To Cart', url: 'products/cart' })
    this.commonService.gobackLink.next({ text: 'Go To Shopping', url: '/products' })
    
    this.darkTheme = this.commonService.darkTheme;
  }
  
  addToCartProduct(product) {
    this.cartService.addToCart(product);
    this.toastr.success(product.title + 'Successfully Added')
  }
  
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.commonService.gobackLink.next({text:'',url:''})
    this.commonService.goToCart.next({ text: '', url: '' })
  }
}

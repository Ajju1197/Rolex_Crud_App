import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/appServices/cart.service';
import { CommonService } from 'src/app/shared/sharedServices/common.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  productList: any;
  searchString: string = '';
  loading: boolean = false;
  totalItem: number = 0;
  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    public commonService:CommonService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.cartService.getAllProducts().subscribe((data) => {
      this.productList = data;
      this.productList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price })
      });
      this.loading = false;
    }, (err) => {
      this.toastr.error(err.message)
    });

    this.cartService.getProducts().subscribe((data) => {
      this.totalItem = data.length;
    })
    this.commonService.goToAdmin.next({ text: 'Go To Admin', url: '' })
  }
  
  searchPostsValue(searchValue) {
    this.searchString = searchValue;
  }

  ngOnDestroy(): void {
    this.commonService.goToAdmin.next({ text: '', url: '' })
  }
}

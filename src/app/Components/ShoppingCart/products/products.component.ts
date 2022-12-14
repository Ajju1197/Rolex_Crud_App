import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Services/cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList: any;
  searchString: string = '';
  loading: boolean = false;
  totalItem: number = 0;
  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
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
  }

  searchPostsValue(searchValue) {
    this.searchString = searchValue;
  }

}

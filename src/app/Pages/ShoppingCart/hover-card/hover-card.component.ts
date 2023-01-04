import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { filterAnimation } from 'src/app/Animations/animation';
import { CartService } from 'src/app/appServices/cart.service';
import { CommonService } from 'src/app/shared/sharedServices/common.service';

@Component({
  selector: 'app-hover-card',
  templateUrl: './hover-card.component.html',
  styleUrls: ['./hover-card.component.css'],
  animations:[filterAnimation]
})
export class HoverCardComponent implements OnInit {

  @Input() products;
  @Input() searchString;
  // @Output() addCart: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private toastr: ToastrService,
    private cartService: CartService,
    public commonService:CommonService
  ) { }

  ngOnInit(): void {}

  addToCart(item:any) {
    this.cartService.addToCart(item);
    this.toastr.success(item.title + 'Successfully Added')
  }
}


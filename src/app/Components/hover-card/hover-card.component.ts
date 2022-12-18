import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-hover-card',
  templateUrl: './hover-card.component.html',
  styleUrls: ['./hover-card.component.css']
})
export class HoverCardComponent implements OnInit {

  @Input() products;
  @Input() searchString;
  // @Output() addCart: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private toastr: ToastrService,
    private cartService:CartService,
  ) { }

  ngOnInit(): void {}

  addToCart(item:any) {
    this.cartService.addToCart(item);
    this.toastr.success(item.title + 'Successfully Added')
  }
}


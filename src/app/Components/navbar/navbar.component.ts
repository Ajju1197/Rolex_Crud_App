import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('onOff', [
      transition(':enter', [style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate(400)
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {

  showSideNav: boolean = false;
  isActive: boolean = false;
  constructor() { }


  ngOnInit(): void {
  }
  openNav() {
    this.isActive = !this.isActive
    this.showSideNav = !this.showSideNav
  }






}



import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IUser } from 'src/app/Modals/IUser';

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
    window.addEventListener('scroll', function () {
      navbarScroll();
    });
    function navbarScroll() {
      var y = window.scrollY;
      if (y > 10) {
        var header = document.getElementsByClassName('header')[0];
        header.classList.add('small');

      } else if (y < 10) {
        var header = document.getElementsByClassName('header')[0];
        header.classList.remove('small');
      }
    }

  }
  openNav() {
    this.isActive = !this.isActive
    this.showSideNav = !this.showSideNav
  }






}



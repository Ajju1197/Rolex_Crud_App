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

  showSideNavShow: boolean = false;
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
        var sideNav = document.getElementsByClassName('sidebar-slider')[0];
        header.classList.add('small');
        sideNav.classList.add('sideNavHeightClass');

      } else if (y < 10) {
        var header = document.getElementsByClassName('header')[0];
        var sideNav = document.getElementsByClassName('sidebar-slider')[0];
        header.classList.remove('small');
        sideNav.classList.remove('sideNavHeightClass');
      }
    }

  }
  openNav() {
    this.isActive = !this.isActive
    this.showSideNavShow = !this.showSideNavShow
  }
  showSideNavOf() {
    if (window.innerWidth <= 768) {
      this.showSideNavShow = false;
    } else {
      this.showSideNavShow = true;
    }
  }






}



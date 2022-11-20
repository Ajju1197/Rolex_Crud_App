import { Component, ElementRef, HostBinding, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './Animations/animation';
import { titleAnimation } from './CustomDirectives/alert/alert.component';
import Swal from 'sweetalert2'
import { CommonService } from './shared/sharedServices/common.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation,titleAnimation
    // animation triggers go here
  ]
})
export class AppComponent implements OnInit {
  title = 'Angular-Crud-With-Api-App';
  isShow: boolean;
  topPosToStartShowing = 50;
  darkTheme: boolean = false;


  constructor(private _commonService:CommonService){}    
  @HostListener('window:scroll')
  
 checkScroll() {
      
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);
    
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
  
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior:'smooth'
    })
  }

  ngOnInit(): void {
    this.checkScroll();
    this.changeDarkTheme(DataTransfer)
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  
  changeDarkTheme(data) {
    this.darkTheme = !this.darkTheme;
    this._commonService.darkTheme = this.darkTheme
  }


}

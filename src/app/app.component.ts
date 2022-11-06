import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './Animations/animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class AppComponent implements OnInit {
  title = 'Angular-Crud-With-Api-App';
  isShow: boolean;
  topPosToStartShowing = 100;

  @HostBinding('window:scroll')
  
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
    window.addEventListener('scroll', function () {
      navbarScrollUp();
    });
    function navbarScrollUp() {
      var y = window.scrollY;
      if (y > 300) {
        var header = document.getElementsByClassName('scrollUp')[0];
        header.classList.add('hide');

      } else if (y < 300) {
        var header = document.getElementsByClassName('scrollUp')[0];
        header.classList.remove('hide');
      }
    }
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}

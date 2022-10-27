import { Component, OnInit } from '@angular/core';
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

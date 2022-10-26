import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
}

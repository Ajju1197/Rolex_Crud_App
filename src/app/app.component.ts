import { Component, ElementRef, HostBinding, HostListener, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './Animations/animation';
import { titleAnimation } from './CustomDirectives/alert/alert.component';
import Swal from 'sweetalert2'
import { CommonService } from './shared/sharedServices/common.service';
import { AuthService } from './appServices/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';





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
  public loginposts:any = [];
  darkTheme: boolean = true;
  @Input() loginFormShowHide: boolean = true;
  @ViewChild('cursor',{ static: true }) cursor: ElementRef;
  @ViewChild('cursor2',{ static: true }) cursor2: ElementRef;


  public navLinks = [
    {
    id: 1,
    name: 'Admin',
    url: '',
    routerLink:'active',
    },
    {
    id: 2,
    name: 'About',
    url: 'about',
    routerLink:'active',
    },
    {
    id: 3,
    name: 'Albums',
    url: 'albums',
    routerLink:'active',
    },
    {
    id: 4,
    name: 'User Posts',
    url: '/posts',
    routerLink:'active',
    },
    {
    id: 5,
    name: 'Shopping',
    url: '/products',
    routerLink:'active',
    },
    {
    id: 6,
    name: 'Insta Posts',
    url: 'instagram',
    routerLink:'active',
    },
    {
    id: 7,
    name: 'Photos',
    url: 'photos/all-photos',
    routerLink:'active',
    },
  ]
  email: string;
  

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public _commonService: CommonService,
    private authService: AuthService,
  ) {
    this.authService.getUser().subscribe((user) => {
      console.log("this is App component User :", user);
      
      this.email = user?.email;
      console.log('this is the App component email ' + this.email);
      
    });
  } 
  

  // Toglle Dark and Light theme
  checkCheckBoxvalue(event: any ){
    if(event.target.checked == true)
    {
      this.document.body.classList.add('test');
    }
    else
    {
      this.document.body.classList.remove('test');
    }
    
  }


  topPosToStartShowing = 50;
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
  // scrollToTop() {
  //   window.scrollTo(0, 0);
  // }

  ngOnInit(): void {
    this.checkScroll();
    this.changeDarkTheme(DataTransfer)
    document.addEventListener('mousemove', (e) => {
      var x = e.clientX;
      var y = e.clientY;
      this.cursor.nativeElement.style.top = this.cursor2.nativeElement.style.top = y + 'px';
      this.cursor.nativeElement.style.left = this.cursor2.nativeElement.style.left = x + 'px';
    })
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  
  changeDarkTheme(data) {
    this.darkTheme = !this.darkTheme;
    this._commonService.darkTheme = this.darkTheme
  }
}

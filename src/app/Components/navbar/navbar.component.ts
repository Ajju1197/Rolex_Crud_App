import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/appServices/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/sharedServices/common.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
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

  email = null;
  loggedInUserName;
  isShow :boolean;
  headerName = "Syed Ajmathulla"
  showSideNavShow: boolean = false;
  isActive: boolean = false;
  isHomeburgerRotate: boolean;
  gobackLink;
  goToCart;
  goToAdmin;
  // searchText = new BehaviorSubject('');
  // searchValue = new BehaviorSubject('');
  @Output()
  isDarkTheme: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() darkTheme;
  @Input() showHidePages: boolean = false;
  userData: any;
  imageUrl: any;
  goToAddPhotos: any;
  navShowOnlyAdmin: any;
  @Input() showHideElementsObject = {
    showHideElementsInDashboard: false,
    showHideElementsInYoutube: false,
  }

  constructor(
    private router: Router,
    public commonService: CommonService,
    public authService: AuthService,
    private toastrService: ToastrService,
    public storage: AngularFireStorage,
    private afs: AngularFirestore,
    private afdb:AngularFireDatabase
  ) {
    this.authService.getUser().subscribe((user) => {
      console.log("this is navbar component User :", user);
      this.email = user?.email;
      console.log('this is the navbar component email ' + this.email);

      if (user) {
        this.afdb.object(`loginposts/${user.uid}`).valueChanges().subscribe(userData => {
          this.userData = userData;
          console.log(this.userData);

        })
      }

    });

    // For Goto Shopping
    this.commonService.gobackLink.subscribe((res) => {
      this.gobackLink = res;
    });

    // Fot Goto Cart
    this.commonService.goToCart.subscribe((res) => {
      this.goToCart = res;
    });

    // For go to admin
    this.commonService.goToAdmin.subscribe((res) => {
      this.goToAdmin = res;
    })

    // For go to add photos
    this.commonService.goToAddPhotos.subscribe((res) => {
      this.goToAddPhotos = res;
    })

    // For NavOnlyInAdmin
    this.commonService.navShowOnlyAdmin.subscribe((res) => {
      this.navShowOnlyAdmin = res
    })

  }


  async signOut() {
    try {
      await this.authService.signOut();
      this.router.navigateByUrl('/login');
      this.toastrService.info('Logout Success')
      this.email = null;
    } catch (error) {
      this.toastrService.error('something is wrong')
    }
  }


  gotoPhotos = window.innerWidth < 767;


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
      } else if (y < 10) {
        var header = document.getElementsByClassName('header')[0];
        var sideNav = document.getElementsByClassName('sidebar-slider')[0];
        header.classList.remove('small');
      }
    }

    this.gotoPhotos = !this.goToAddPhotos.text
  }

  searchPostsValue(searchStringValue: string) {
    console.log(searchStringValue);
    this.commonService.searchInputValue = searchStringValue;

    console.log(  this.commonService.searchInputValue + ' Nav Bar compo');
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


  toggleTheme() {
    this.isDarkTheme.emit();
  }


  isShowHide() {
    this.isShow = !this.isShow
  }

  homeburgerRotate() {
    this.isHomeburgerRotate =! this.isHomeburgerRotate
  }

}



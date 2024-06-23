import { Component, ElementRef, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/sharedServices/common.service';
import { ActivatedRoute } from '@angular/router';
import { bounceAnimation, fade, slideElementAnimation, slideLeftElementAnimation, slidesTwoWay } from 'src/app/Animations/animation';
import { ChangeBgColorDirective } from 'src/app/CustomDirectives/change-bg-color.directive';
import { interval } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    fade,slidesTwoWay,slideElementAnimation,bounceAnimation,slideLeftElementAnimation
  ]
})
export class AdminComponent implements OnInit,OnDestroy {

  isActive: boolean = false;
  isAnimate: boolean;
  title: string = 'Login Profiles';
  color = this.isActive === true ? 'rgba(0,0,0,0.47)' : 'transparent'
  display = this.isActive === true ? 'block' : 'none'
  
  public loginposts: any = [];
  userData: any;
  
  @ViewChild(ChangeBgColorDirective) changeBgColor: ChangeBgColorDirective;
  colors = ['red', 'green', 'yellow'];
  @ViewChild('bgColor') bgColor: ElementRef;
  i = 0;

  changeColor() {
    // this.changeBgColor.changeBgColor(e)
    // const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)]

    this.i = this.i < this.colors.length ? ++this.i : 0;
    console.log(this.i);
    
    this.bgColor.nativeElement.style.backgroundColor = this.colors[this.i];
    this.bgColor.nativeElement.classList = 'transitionClass'
    this.bgColor.nativeElement.innerText = 'This is Syed Ajmathulla'
  }
  // changeYellowColor(e) {
  //   this.changeBgColor.changeBgColor(e)
  // }



  constructor(
    private _db: AngularFireDatabase,
    private _toastr: ToastrService,
    private commonService: CommonService,
    private route:ActivatedRoute,
  ) { 
    // Getting all the loginposts from AngularFireDataBase
    _db.object('/loginposts').valueChanges().subscribe((obj) => {
      if (obj) {
        this.loginposts = Object.values(obj);
            console.log(JSON.stringify(this.loginposts[0])+ 'adminCompo');
          } else {
            this._toastr.error('No user Found')
            this.loginposts = [];
          }
        })
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   console.log('ajju bhai animate');
    //   this.isAnimate =! this.isAnimate
    // }, 3000)

    const shakeObeservable$ = interval(3000)

    shakeObeservable$.subscribe((data) => {
      this.isAnimate =! this.isAnimate
    })

    this.route.fragment.subscribe((data) => {
      this.jumpTo(data);
    })


    this.commonService.navShowOnlyAdmin.next(
      {
        text: 'Admin', url: '/',
        text2: 'About', url2: '/'
      }
    )
    
  }

  jumpTo(section) {
    setTimeout(() => {
      document.getElementById(section).scrollIntoView({behavior:'smooth'})
    }, 1000);
  }


  clickToShowLoginUsersProfiles() {
    this.isActive =!this.isActive;
  }
  
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.commonService.navShowOnlyAdmin.next({text:'',url:'',text2:'',url2:''})
    
  }

}

import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
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
export class AdminComponent implements OnInit {

  isActive: boolean = false;
  isAnimate: boolean;
  title: string = 'Login Profiles';
  
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
    
  }


  clickToShowLoginUsersProfiles() {
    this.isActive =!this.isActive;
  }

}

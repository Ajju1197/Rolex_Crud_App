import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { slideBottomElementAnimation, slideElementAnimation, slideLeftElementAnimation, slideTopElementAnimation } from 'src/app/Animations/animation';
import { CommonService } from 'src/app/shared/sharedServices/common.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations:[slideElementAnimation,slideLeftElementAnimation,slideBottomElementAnimation,slideTopElementAnimation]
})
export class AboutComponent implements OnInit {

  constructor(public commonService:CommonService,private route:ActivatedRoute) { }

  @ViewChild('dateInput') dateOfBirth:ElementRef;
  @ViewChild('age') age: ElementRef;
  
  calculateAge() {
    let birthYear = new Date(this.dateOfBirth.nativeElement.value).getFullYear();
    let currYear = new Date().getFullYear();
    let age = currYear - birthYear;
    this.age.nativeElement.value = age.toString();

  }
  
  ngOnInit(): void {
    this.route.fragment.subscribe(res => {
      this.jumpTo(res)
    })
  }

  jumpTo(section) {
    setTimeout(() => {
      document.getElementById(section).scrollIntoView({behavior:'smooth'})
    }, 1000);
  }

}

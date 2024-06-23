import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';
import { accordianAnimation, fade, slideBottomElementAnimation, slideElementAnimation, slideLeftElementAnimation, slideTopElementAnimation } from 'src/app/Animations/animation';
import { CommonService } from 'src/app/shared/sharedServices/common.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations:[slideElementAnimation,slideLeftElementAnimation,slideBottomElementAnimation,slideTopElementAnimation,fade,accordianAnimation]
})
export class AboutComponent implements OnInit,AfterViewInit {

  constructor(public commonService:CommonService,private route:ActivatedRoute,private renderer:Renderer2) { }

  @ViewChild('dateInput') dateOfBirth:ElementRef;
  @ViewChild('age') age: ElementRef;
  @ViewChild('seeMoreLessText') seeMoreLessText: ElementRef;
  itSecExp: boolean = true;
  seeless: any = false;
  seeLessMore: any = '...see more'

  
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
    this.seeLessMore.nativeElement.innerText = '...see more'

  }
  onSeeMore() {
    this.seeless = !this.seeless;
    if (this.seeless === false) {
      this.seeLessMore = '...see more';
      this.seeMoreLessText.nativeElement.innerText = '...see more'
    } else {
      this.seeLessMore = 'see less...';
      this.seeMoreLessText.nativeElement.innerText = '...see less'
      
    }
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.seeMoreLessText.nativeElement.innerText = '...see more'
    console.log(this.seeMoreLessText);

  }
  jumpTo(section) {
    setTimeout(() => {
      document.getElementById(section).scrollIntoView({behavior:'smooth'})
    }, 1000);
  }

  onItSecExp() {
    this.itSecExp = !this.itSecExp;
  }


}

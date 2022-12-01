import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/shared/sharedServices/common.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public commonService:CommonService) { }

  @ViewChild('dateInput') dateOfBirth:ElementRef;
  @ViewChild('age') age: ElementRef;
  
  calculateAge() {
    let birthYear = new Date(this.dateOfBirth.nativeElement.value).getFullYear();
    let currYear = new Date().getFullYear();
    let age = currYear - birthYear;
    this.age.nativeElement.value = age.toString();

  }
  
  ngOnInit(): void {
  }

}

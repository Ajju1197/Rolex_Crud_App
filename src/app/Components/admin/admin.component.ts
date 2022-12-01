import { Component, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate(400)
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {

  }



}

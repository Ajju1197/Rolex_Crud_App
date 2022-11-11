import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/Services/alert.service';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from "@angular/animations";

export const titleAnimation = trigger("titleAnimation", [
  transition(":enter", [
    style({ opacity: 0 }),
    animate("600ms ease", style({ opacity: 1 }))
  ]),
  transition(":leave", [
    style({ opacity: 1 }),
    animate("800ms", style({ opacity: 0 }))
  ])
]);

const listAnimation = trigger("listAnimation", [
  transition("* <=> *", [
    query(
      ":enter",
      [
        style({ opacity: 0 }),
        stagger("100ms", animate("600ms ease-out", style({ opacity: 1 })))
      ],
      { optional: true }
    ),
    query(
      ":leave",
      animate(
        "500ms ease-in",
        style({ opacity: 0, display: "none", transform: "translateX(100px)" })
      ),
      {
        optional: true
      }
    )
  ])
]);

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [titleAnimation, listAnimation]
})
export class AlertComponent implements OnInit,OnDestroy {

  private subscription: Subscription;
  public message: any;
  constructor(private alertService:AlertService) { }

  ngOnInit(): void {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message
      console.log(this.message);
      setTimeout(() => {
        this.message = false;
      }, 5000)
    })
  }




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe()
  }
  
  deleteNotification() {
    this.message = false;
  }
}

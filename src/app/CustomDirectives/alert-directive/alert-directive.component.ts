import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
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
  selector: 'app-alert-directive',
  templateUrl: './alert-directive.component.html',
  styleUrls: ['./alert-directive.component.css'],
  animations: [titleAnimation, listAnimation]
})
export class AlertDirectiveComponent implements OnInit {

  @Input() alertMessage: string;
  @Output() notifyDelete: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  deleteNotification() {
    this.notifyDelete.emit();
  }
}



import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
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

import { Component, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/sharedServices/common.service';

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

  isActive: boolean = false;
  isAnimate: boolean;
  title:string = 'Login Profiles'

  public loginposts: any = [];

  constructor(
    private _db: AngularFireDatabase,
    private _toastr: ToastrService,
    private commonService: CommonService,
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

    setInterval(() => {
      console.log('ajju bhai animate');
      this.isAnimate =! this.isAnimate
    }, 3000)
    
  }


  clickToShowLoginUsersProfiles() {
    this.isActive =!this.isActive;
  }

}

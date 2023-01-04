import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/Modals/IUser';
import { AlertService } from 'src/app/appServices/alert.service';
import { UsersService } from 'src/app/appServices/users.service';
import { CommonService } from 'src/app/shared/sharedServices/common.service';
import Swal from 'sweetalert2';
import { fade } from 'src/app/Animations/animation';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { animate, group, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [fade
  ]
})
export class UserComponent implements OnInit {

  userId: any;
  users: IUser[] = [];
  @Input() isSuccess: any;

  @Input() user: IUser;
  @Input()
  filterUsers: IUser[];
  @Input()
  loading;
  @Output() notifyDeleteUser:EventEmitter<any> = new EventEmitter<any>();
    
  constructor(public _commonService: CommonService, private alertService: AlertService, private _userService: UsersService,private afdb:AngularFireDatabase) {

  }
  
  @Input() bgColor = false;
  
  chBackcolor() {
    this.bgColor !== this.bgColor;
  }
  
  
  ngOnInit(): void {
    
  }


  deleteUser(userId) {
    // this.loading = true;
    // this.filterUsers.splice(i,1)
    // this.filterUsers.splice(i, 1)
    this.afdb.object('/users/' + userId).remove();
    // this.alertService.success('Post deleted successfully!', true)
    window.location.reload();
    console.log('Post deleted successfully!');  
    // this.loading = false;
    // this._userService.deleteUser(i).subscribe((data) => {

    // })
    // this.notifyDeleteUser.emit(userId);
  }

}








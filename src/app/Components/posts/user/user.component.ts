import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/Modals/IUser';
import { AlertService } from 'src/app/Services/alert.service';
import { UsersService } from 'src/app/Services/users.service';
import { CommonService } from 'src/app/shared/sharedServices/common.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  searchValue: string = '';
  userId: any;
  users: IUser[] = [];

  @Input() user: IUser;
  @Input()
  filterUsers: IUser[];
  @Input()
  loading;
  @Output() notifyDeleteUser:EventEmitter<any> = new EventEmitter<any>();
  searchText = "";
    
  constructor(public _commonService:CommonService,private alertService:AlertService,private _userService:UsersService) { }

  @Input() bgColor = false;

  chBackcolor() {
  this.bgColor !== this.bgColor;
  }

  ngOnInit(): void {
    
  }







  searchPostsValue(searchStringValue: string) {
    this.searchValue = searchStringValue;
  }


  deleteUser(userId) {
    // this._userService.deleteUser(this.user)
    this.loading = true;
    this._userService.deleteUser(userId).subscribe((data) => {
      // this.users = this.users.filter(item => item.id !== this.userId)
      this.alertService.success('Post deleted successfully!', true)
      window.location.reload();
      console.log('Post deleted successfully!');
      this.loading = false;
    })
    this.notifyDeleteUser.emit(userId);
  }

}








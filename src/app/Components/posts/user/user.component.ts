import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/Modals/IUser';
import { AlertService } from 'src/app/Services/alert.service';
import { UsersService } from 'src/app/Services/users.service';

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
    
  constructor(private alertService:AlertService,private _userService:UsersService) { }

  ngOnInit(): void {
  }

  searchPostsValue(searchStringValue: string) {
    this.searchValue = searchStringValue;
  }


  deleteUser() {
    // this._userService.deleteUser(this.user)
    this.loading = true;
    this._userService.deleteUser(this.userId).subscribe((data) => {
      this.users = this.users.filter(item => item.id !== this.userId)
      this.alertService.success('Post deleted successfully!',true)
      console.log('Post deleted successfully!');
      this.loading = false;
    })
    this.notifyDeleteUser.emit(this.userId);
  }

}

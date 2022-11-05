import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/Modals/IUser';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

 
  @Input()
  filterUsers: IUser[];
  @Output() notifyDeleteUser:EventEmitter<any> = new EventEmitter<any>();
    
  constructor(private _userService:UsersService) { }

  ngOnInit(): void {
  }

  deleteUser() {
    // this._userService.deleteUser(this.user)
    this.notifyDeleteUser.emit();
  }

}

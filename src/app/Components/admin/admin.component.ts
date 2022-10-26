import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Modals/IUser';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public users: IUser[] = [];
  public errorMessage: string | undefined;
  public loading: boolean | undefined;
  public filterUsers: IUser[];
  public _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filterUsers = this.filterUsersFun(value)
  }
  filterUsersFun(searchString: string) {
    return this.users.filter((user) => user.username.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
  }

  constructor(private _userService: UsersService, private _router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this._userService.getAllUsers().subscribe((data) => {
      console.log(data)
      this.loading = true;
      this.users = data;
      this.filterUsers = this.users;
      console.log(this.users)
      this.loading = false
    },
      (err) => { this.errorMessage = err }
    )
  }


}

import { Component, OnInit } from '@angular/core';
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

  constructor(private _userService: UsersService, private _router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this._userService.getAllUsers().subscribe((data) => {
      console.log(data)
      this.loading = true;
      this.users = data;
      console.log(this.users)
      this.loading = false
    },
      (err) => { this.errorMessage = err }
    )
  }

}

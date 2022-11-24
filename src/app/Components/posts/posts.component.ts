import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Modals/IUser';
import { AlertService } from 'src/app/Services/alert.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public users: IUser[] = [];
  public errorMessage: string | undefined;
  public loading: boolean = false;
  public filterUsers: IUser[];
  public _searchTerm: string;
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filterUsers = this.filterUsersFun(value)
  }
  get searchTerm(): string {
    return this._searchTerm;
  }
  filterUsersFun(searchString: string) {
    return this.users.filter((user) => user.username.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
  }

  constructor(private alertService:AlertService,private _userService: UsersService, private _router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.loading = true;
    this._userService.getAllUsers().subscribe((data) => {
      console.log(data)
      this.users = data;
      this.filterUsers = this.users;
      console.log(this.users)
      this.loading = false
    },
      
      (err) => { this.alertService.error(err),this.errorMessage = err }
    )
  }
  
  // deleteUser(userId: any) {

  //   this.users = userId;
  //   // this.loading = true;
  //   // this._userService.deleteUser(userId).subscribe((data) => { 
  //   //   this.users = this.users.filter(item => item.id !== userId)
  //   //   console.log('Post deleted successfully!');
  //   //   this.loading = false;
  //   // })
  // }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/Modals/IUser';
import { UsersService } from 'src/app/Services/users.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public loading: boolean = false;
  public user: IUser = {} as IUser;
  public userId: string;
  public errorMessage: string;

  constructor(private _userService: UsersService, private _activatedRoute: ActivatedRoute, private _router: Router) { }
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((param) => {
      this.userId = param.get('userId')
    });
    if (this.userId) {
      this.loading = true;
      this._userService.getUser(this.userId).subscribe((data) => {
        this.user = data;
        this.loading = false;
      }, (err) => {
        this.errorMessage = err;
      })
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/Modals/IUser';
import { UsersService } from 'src/app/appServices/users.service';
import { CommonService } from 'src/app/shared/sharedServices/common.service';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit,OnDestroy {
  public loading: boolean = false;
  public user: IUser = {} as IUser;
  public userId: string;
  public errorMessage: string;



  constructor(
    private _userService: UsersService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _db: AngularFireDatabase,
    private _toastr: ToastrService,
    public _commonService:CommonService
  ) { 
    this.loading = true;
  }


  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((param) => {
      this.userId = param.get('userId')
      console.log(this.userId)
    });
    if (this.userId) {
      this.loading = true;
      this._userService.getUser(this.userId).subscribe((data) => {
        this.user = data;
        this._toastr.success('User fetched Successfully!')
        console.log(this.user);
        this.loading = false;
      }, (err) => {
        this.errorMessage = err;
      })
    }

    this._commonService.goToAdmin.next({text:'Go to Posts',url:'posts'})
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._commonService.goToAdmin.next({text:'',url:''})
  }
}

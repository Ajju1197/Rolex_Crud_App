import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { IUser } from 'src/app/Modals/IUser';
import { AlertService } from 'src/app/Services/alert.service';
import { UsersService } from 'src/app/Services/users.service';
import { CommonService } from 'src/app/shared/sharedServices/common.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public id: any;
  public submitted: boolean = false;
  public user: IUser;
  public userId: string;
  public loading = false;
  public errorMessage: string | null = null;
  public fb: FormGroup
  public darkThemeFromAppCompo: boolean;


  constructor(public _commonService:CommonService,private alertService:AlertService,private _userService: UsersService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.params['userId'];
    this._userService.getUser(this.id).subscribe((data) => {
      this.user = data;
    });
    /*##################### Registration Form #####################*/
    this.fb = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });
    
  }

    // Getter method to access formcontrols
    get myForm() {
      return this.fb.controls;
    }
  

    onSubmit() {
    this.submitted = true;
      if (this.fb.valid) {
        this._userService.updateUser(this.id, this.fb.value).subscribe((data) => {
          Swal.fire({
            title: 'success',
            icon: 'success',
            text: 'Post Can be Updated Successfully',
            confirmButtonText: 'Cool',
          })
        this._router.navigateByUrl('admin/posts');
        setTimeout(() => {
          this.alertService.success('Post updated successfully!',true)
        }, 1100);
      }, (error) => {
        this.alertService.error(error)
        this.errorMessage = error;
        this._router.navigate(['admin/edit'])
      })
    }
  }
}



import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { IUser } from 'src/app/Modals/IUser';
import { AlertService } from 'src/app/appServices/alert.service';
import { UsersService } from 'src/app/appServices/users.service';
import { CommonService } from 'src/app/shared/sharedServices/common.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit,OnDestroy {

  public id: any;
  public submitted: boolean = false;
  public user: IUser;
  public userId: string;
  public loading = false;
  public errorMessage: string | null = null;
  public fb: FormGroup
  public darkThemeFromAppCompo: boolean;


  constructor(private cd: ChangeDetectorRef,public _commonService:CommonService,private alertService:AlertService,private _userService: UsersService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.id = this._route.snapshot.params['userId'];
    this._userService.getUser(this.id).subscribe((data) => {
      this.user = data;
      this.loading = false;
    });
    /*##################### Registration Form #####################*/
    this.fb = new FormGroup({
      file:new FormControl(''),
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });

    this._commonService.goToAdmin.next({text:'Go to Posts',url:'/posts'})
    
  }

  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = 'https://images.unsplash.com/photo-1640437831350-cacb7fa66989?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fHJvbGV4fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60';
  editFile: boolean = true;
  removeUpload: boolean = false;
  uploadFile(event) {
    let reader = new FileReader();// HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file)

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.fb.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://images.unsplash.com/photo-1640437831350-cacb7fa66989?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fHJvbGV4fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60';
    this.editFile = true;
    this.removeUpload = false;
    this.fb.patchValue({
      file: new FormControl(null)
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._commonService.goToAdmin.next({text:'',url:''})
  }
}



import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
// import { Users } from 'src/app/Modals/data';
import { IUser } from 'src/app/Modals/IUser';
import { ValidatePassword } from 'src/app/Modals/validate-password';
import { AlertService } from 'src/app/Services/alert.service';
import { UsersService } from 'src/app/Services/users.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
  public submitted:boolean= false;
  public loading: boolean = false;
  public customer: IUser[];
  public errorMessage: string | null = null;
  public fb:FormGroup

  constructor(
    private _userService: UsersService,
    private alertService:AlertService,
    private _router: Router,
    private route: ActivatedRoute,
  ) { }
 

  ngOnInit(): void {
 /*##################### Registration Form #####################*/
    this.fb = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      phone: new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10), Validators.pattern('^[0-9]+$')]),
})

  }

  // Getter method to access formcontrols
  get myForm() {
    return this.fb.controls;
  }


  onSubmit(){
    this.submitted = true;
    if (this.fb.valid) {
      this._userService.createUser(this.fb.value).subscribe((res) => {
        Swal.fire('Post Can be Added Successfully')
        this._router.navigateByUrl('admin/posts');
        setTimeout(() => {
          this.alertService.success('Post created successfully!', true);
        }, 1100)
      }, (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
        this._router.navigate(['/admin/add'])
        this.alertService.error(error);
        this.errorMessage = error;
      })
    }
  }
}
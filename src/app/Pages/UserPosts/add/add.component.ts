import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
// import { Users } from 'src/app/Modals/data';
import { IUser } from 'src/app/Modals/IUser';
import { ValidatePassword } from 'src/app/Modals/validate-password';
import { AlertService } from 'src/app/appServices/alert.service';
import { UsersService } from 'src/app/appServices/users.service';
import Swal from 'sweetalert2'
import { CommonService } from 'src/app/shared/sharedServices/common.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit,OnDestroy {
  public submitted:boolean= false;
  public loading: boolean = false;
  public customer: IUser[];
  public errorMessage: string | null = null;
  // public fb:FormGroup

  constructor(
    private _userService: UsersService,
    private alertService: AlertService,
    public _commonService: CommonService,
    public formBuilder: FormBuilder,
    private _router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) { }
   // state names
   States: any = ['Andhra Pradhesh', 'Telangana', 'Tamilnadu', 'Bangalore']

  fb = this.formBuilder.group({
    file: [null],
    username: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
    address: this.formBuilder.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipcode: ['', [Validators.required]]
    }),
  })
    ngOnInit(): void {
      /*##################### Registration Form #####################*/
      

    //     this.fb = new FormGroup({
    //       file: new FormControl(null),
    //       name: new FormControl('', [Validators.required,Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]),
    //       username: new FormControl('', [Validators.required]),
    //       email: new FormControl('', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    //       phone: new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10), Validators.pattern('^[0-9]+$')]),
    //       address: new FormGroup({
    //         street: new FormControl('', [Validators.required, Validators.minLength(2)]),
    //         city: new FormControl('', [Validators.required, Validators.minLength(2)]),
    //         state: new FormControl('', [Validators.required, Validators.minLength(2)]),
    //         zipcode: new FormControl('', [Validators.required, Validators.minLength(2)])
    //       })
    // })
      
    this._commonService.goToAdmin.next({text:'Go to Posts',url:'/posts'})

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._commonService.goToAdmin.next({text:'',url:''})
  }



  
  // File Uploading

  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = 'https://images.unsplash.com/photo-1640437831350-cacb7fa66989?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fHJvbGV4fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
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
    this.el.nativeElement.value = null;
    this.editFile = true;
    this.removeUpload = false;
    this.fb.patchValue({
      file: [null]
    });
  }


  
    // Choose city using select dropdown
    changeState(e) {
      this.fb.get('address.state').setValue(e.target.value, {
        onlySelf: true
      })
    }
  
   // Getter method to access formcontrols
   get myForm() {
    return this.fb.controls;
  }
  

  onSubmit(){
    this.submitted = true;
    if (this.fb.valid) {
      console.log(this.fb.value)
      this._userService.createUser(this.fb.value).subscribe((res) => {
        Swal.fire('Post Can be Added Successfully')
        this._router.navigateByUrl('/posts');
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
        this._router.navigate(['/posts/add'])
        this.alertService.error(error);
        this.errorMessage = error;
      })
    } else {
      alert('Please fill all the required fields to create a super hero!')
    }
  }
  
}
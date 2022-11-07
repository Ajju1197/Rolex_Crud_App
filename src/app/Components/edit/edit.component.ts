import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/Modals/IUser';
import { UsersService } from 'src/app/Services/users.service';

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
  public fb:FormGroup


  constructor(private _userService: UsersService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.params['userId'];
    this._userService.getUser(this.id).subscribe((data) => {
      this.user = data;
    });
     /*##################### Registration Form #####################*/
     this.fb = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      phone: new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10), Validators.pattern('^[0-9]+$')]),

  // name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
  // username: ['', [Validators.required]],
  // email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
  // phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
  // address: this.fb.group({
  //   street: ['', [Validators.required]],
  //   city: ['', [Validators.required]],
  //   zipcode: ['', [Validators.required]]
  // }),
})
  }

    // Getter method to access formcontrols
    get myForm() {
      return this.fb.controls;
    }
  

    onSubmit() {
    this.submitted = true;
    this.loading = true;
    this._userService.updateUser(this.id, this.fb.value).subscribe((data) => {
        console.log('Post updated successfully!');
        this._router.navigateByUrl('admin/posts');
    }, (error) => {
      this.errorMessage = error;
      // this._router.navigateByUrl(`admin/edit/${this.id}`)
    })
      this.loading = false;
  }
}

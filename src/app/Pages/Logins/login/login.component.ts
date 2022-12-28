import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword} from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/appServices/auth.service';
import { CommonService } from 'src/app/shared/sharedServices/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

//   loginForm!: FormGroup
//   get emailControl() {
//     return this.loginForm.get('email') as FormControl;
// }

// get passwordControl() {
//   return this.loginForm.get('password') as FormControl;
// }
  
constructor(private fb: FormBuilder, private auth:Auth,private router:Router,public _commonService:CommonService,private authService: AuthService,private toastr:ToastrService) { 
}

loginForm = this.fb.group({
  email: this.fb.control('',[Validators.required,Validators.minLength(5),Validators.email]),
  password: this.fb.control('',[Validators.required,Validators.minLength(5)]),
})
  
  
  get myForm() {
    return this.loginForm.controls
  }
  onSubmit() {
    this.authService.signIn(
      this.myForm.email.value,
      this.myForm.password.value
    ).then((res) => {
      this.router.navigateByUrl('');
      this.toastr.success('SignIn successful');
      this._commonService.pressMe('Ohh great SignIn successful');
    }).catch((err) => {
      console.log(err);
      this.toastr.error('SignIn Failed');
      this._commonService.pressMe('SignIn Failed Please SignUp');
      
    })
  }

  ngOnInit(): void {
  }

}

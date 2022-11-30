import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword} from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  get emailControl() {
      return this.registerForm.get('email') as FormControl;
  }
  
  get passwordControl() {
    return this.registerForm.get('password') as FormControl;
  }
  
  constructor(private fb: FormBuilder, private auth: Auth, private authService: AuthService,private toastr:ToastrService,private router:Router) { 
    this.registerForm = this.fb.group({
      email: fb.control('',[Validators.required,Validators.email]),
      password: fb.control('', [Validators.required, Validators.minLength(6)]),
    })
  }


  public onSubmit() {
    this.authService.signUp(
      this.emailControl.value,
      this.passwordControl.value
    ).then((res) => {
      this.router.navigateByUrl('/login');
      this.toastr.success('Registration successful');
    }).catch((err) => {
      console.log(err);
      this.toastr.error('Registration Failed');
      
    })
    // console.log(this.registerForm.value);
    // createUserWithEmailAndPassword(
    //   this.auth,
    //   this.registerForm.value.email,
    //   this.registerForm.value.password,
    // ).then((res:any) => {
    //   console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    //   alert(err.message)
    // })
  }
  ngOnInit(): void {
  }

}

import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-insign-upauth',
  templateUrl: './sign-insign-upauth.component.html',
  styleUrls: ['./sign-insign-upauth.component.css']
})
export class SignInsignUpauthComponent implements OnInit {

  Form: FormGroup;
  signUpUsers: any[] = [];
  signUpObj: any;
  loginObj = {
    email: '',
    password:'',
  };
  rightPanel: boolean = false;
  constructor(
    private fb: FormBuilder,
    private toastr:ToastrService,
  ) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      username:this.fb.control('',[Validators.required]),
      email:this.fb.control('',[Validators.required,Validators.email]),
      password:this.fb.control('',[Validators.required]),
    })

    const localData = localStorage.getItem('signUpUsers')

    if (localData != null) {
      this.signUpUsers = JSON.parse(localData)
    }
  }

  onSubmitSignUp() {
    console.log(this.Form.value.email + 'New Form'); 
    this.signUpUsers.push(
      this.signUpObj = {
        username: this.Form.value.username,
        email: this.Form.value.email,
        password:this.Form.value.password
      }
    )

    localStorage.setItem('signUpUsers',JSON.stringify(this.signUpUsers))

  }

  onSubmitSignIn() {
    debugger
    const isUserExist = this.signUpUsers.find(m => m.email === this.loginObj.email && m.password === this.loginObj.password)
    if (isUserExist != undefined) {
      this.toastr.success('Login Successfull')
    } else {
      this.toastr.error('Login Failed')
    }
  }



  signUpClick() {
    this.rightPanel = true;
    // localStorage.removeItem('signUpUsers')
    // this.container.nativeElement.classList.add('right-panel-active')
  }
  
  signInClick() {
    this.rightPanel = false;
    // this.container.nativeElement.classList.remove('right-panel-active')
  }

}

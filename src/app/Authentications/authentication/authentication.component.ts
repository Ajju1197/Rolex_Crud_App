import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/Modals/auth';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  form: FormGroup;
  loginMode: boolean = true;
  errorMessage: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router:Router,
  ) { }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control('',[Validators.required,Validators.minLength(5),Validators.email]),
      password: this.fb.control('',[Validators.required,Validators.minLength(5)]),
    })
  }

  // onSubmit() {
  //     if (this.form.valid) {
  //       const email = this.form.value.email;
  //       const password = this.form.value.password;
  //       let authObservable: Observable<Auth>;
    
  //       if (this.loginMode) {
  //         authObservable = this.authService.signIn(email, password);
  //       } else {
  //         authObservable = this.authService.signUp(email, password);
  //       }
    
  //       authObservable.subscribe((res) => {
  //         console.log(res);
  //         if (this.loginMode) {
  //           this.router.navigate([''])
  //         }
  //         this.toastr.success('SignIn is Successfull')
  //       }, (err) => {
  //         console.log(err);
  //         this.toastr.error('Erro')
  //       })
  //     } else {
  //       // err...
  //   }
  // }


  onModeSwitch() {
    this.loginMode = !this.loginMode
  }

}

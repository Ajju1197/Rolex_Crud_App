import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword} from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm! :FormGroup
  
  constructor(private fb: FormBuilder, private auth:Auth) { 
    this.registerForm = this.fb.group({
      email: fb.control('',[Validators.required,Validators.minLength(5),Validators.email]),
      password: fb.control('',[Validators.required,Validators.minLength(5)]),
    })
  }


  public onSubmit() {
    console.log(this.registerForm.value);
    createUserWithEmailAndPassword(
      this.auth,
      this.registerForm.value.email,
      this.registerForm.value.password,
    ).then((res:any) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
      alert(err.message)
    })
  }
  ngOnInit(): void {
  }

}

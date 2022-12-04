import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Auth Services
import { AuthService } from 'src/app/Services/auth.service';
import { ToastrService } from 'ngx-toastr';
// Firebase imports
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {AngularFireDatabase} from '@angular/fire/compat/database'
import { Auth, createUserWithEmailAndPassword} from '@angular/fire/auth';
// Browser image resizer
import { readAndCompressImage } from 'browser-image-resizer';
import { imgConfig } from 'src/utils/config';
import { finalize } from 'rxjs';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // registerForm: FormGroup;
  editFile: boolean;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase
  ) { 
    // this.registerForm = this.fb.group({
    //   email: fb.control('',[Validators.required,Validators.email]),
    //   password: fb.control('', [Validators.required, Validators.minLength(6)]),
    //   name: fb.control('', [Validators.required, Validators.minLength(6)]),
    //   username: fb.control('', [Validators.required, Validators.minLength(6)]),
    //   bio: fb.control('', [Validators.required, Validators.minLength(6)]),
    // })
  }

  registerForm = this.fb.group({
    username: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    bio: ['', [Validators.required]],
  })
  
//   get emailControl() {
//     return this.registerForm.get('email') as FormControl;
// }

// get passwordControl() {
//   return this.registerForm.get('password') as FormControl;
// }

// get nameControl() {
//   return this.registerForm.get('name') as FormControl;
// }

// get instausernameControl() {
//   return this.registerForm.get('username') as FormControl;
// }

// get bioControl() {
//   return this.registerForm.get('bio') as FormControl;
// }
  
  get myForm() {
    return this.registerForm.controls;
  }



  picture:string = '../../../../assets/ajju-goa-2.jpeg';
  uploadPercent: number = null;



  onSubmit() {
    this.authService.signUp(
      this.myForm.email.value,
      this.myForm.password.value,
    ).then((res) => {
      const {uid} = res.user
      this.db.object(`/loginposts/${uid}`)
        .set({
          instaId: this.myForm.username.value,
          name: this.myForm.name.value,
          email: this.myForm.email.value,
          bio: this.myForm.bio.value,
          password:this.myForm.password.value,
          picture:this.picture,
        })
    }).then((res) => {
        this.router.navigate(['/login'])
        this.toastr.success('Registration successful');
      })
      .catch((err) => {
      console.log(err);
      this.toastr.error(err.message);
    })
  }
  ngOnInit(): void {
  }



  // File upload method

  async uploadImage(event) {
    const file = event.target.files[0];

    let resizedImage = await readAndCompressImage(file, imgConfig);

    const filePath = file.name //rename the image with uuid
    const fileRef = this.storage.ref(filePath)

    const task = this.storage.upload(filePath, resizedImage)

    task.percentageChanges().subscribe((percentage) => {
      this.uploadPercent = percentage
    });

    this.editFile = false;
    
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe((url) => {
        this.picture = url;
        this.toastr.success('Image uploaded successfully')
      })
    })).subscribe()
  }
}

import { Component, ChangeDetectorRef, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first } from 'rxjs';
// import { Users } from 'src/app/Modals/data';
import { IUser } from 'src/app/Modals/IUser';
import { ValidatePassword } from 'src/app/Modals/validate-password';
import { AlertService } from 'src/app/Services/alert.service';
import { UsersService } from 'src/app/Services/users.service';
import Swal from 'sweetalert2'
import { CommonService } from 'src/app/shared/sharedServices/common.service';

// Angular Fire Database
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';
import { InstapostService } from 'src/app/Services/instapost.service';
import { readAndCompressImage } from 'browser-image-resizer';
import { imgConfig } from 'src/utils/config';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { uuidv4 } from '@firebase/util';

@Component({
  selector: 'app-add-insta-post',
  templateUrl: './add-insta-post.component.html',
  styleUrls: ['./add-insta-post.component.css']
})
export class AddInstaPostComponent implements OnInit {

  public submitted:boolean= false;
  public loading: boolean = false;
  public errorMessage: string | null = null;


  picture: any = 'https://images.unsplash.com/photo-1640437831350-cacb7fa66989?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fHJvbGV4fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  editFile: boolean;
  description: string;
  location: string;
  uploadPercent: number = null;
  user = null;

  constructor(
    public _commonService: CommonService,
    public formBuilder: FormBuilder,
    private _router: Router,
    private _db: AngularFireDatabase,
    private _toastr: ToastrService,
    public _authService: AuthService,
    private _postService: InstapostService,
    private storage:AngularFireStorage,
  ) { 
    _authService.getUser().subscribe((user) => {
      this._db.object(`/loginposts/${user.uid}`).valueChanges().subscribe((user) => {
        this.user = user;
        console.log('login post details: ' + this.user);
        
      })
    })
  }

    ngOnInit(): void {}


  onSubmit() {      
    const uid = uuidv4();
    this._db.object(`/posts/${uid}`).set({
        id:uid,
        picture: this.picture,
        description: this.description,
        location: this.location,
        by: this.user.name,
        instaId:this.user.instaId,
        bio:this.user.bio,
        date: Date.now(),
    }).then((res) => {
      this._toastr.success('Post Added Successfully')
      this._router.navigateByUrl('/admin/allPostsInOnePlace')
    }).catch((err) => {
        this._toastr.error('Oopsss')
      })
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
        this._toastr.success('Image uploaded successfully')
      })
    })).subscribe()
  }


}

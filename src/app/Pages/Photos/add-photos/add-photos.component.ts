import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { FirebaseService } from 'src/app/appServices/firebase.service';
//uuid
import { v4 as uuidv4 } from "uuid";

//browser image resizer
import { readAndCompressImage } from "browser-image-resizer";
import { imgConfig } from "src/utils/config";

@Component({
  selector: 'app-add-photos',
  templateUrl: './add-photos.component.html',
  styleUrls: ['./add-photos.component.css']
})
export class AddPhotosComponent implements OnInit {
  downloadURL: any;
  fileUrl: any;
  isLoading: boolean = false;
  uploadPercent: number = null;


  constructor(
    private _fbService: FirebaseService,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,
    private toastr: ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  form = this.fb.group({
      file:[''],
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: ['']
  });

  public get myForm() {
    return this.form.controls;
  }

  addPhotos() {
    // console.log(this.myForm.address.value);
    this._fbService.createPhotos(this.form.value).set({
      file: this.picture,
      // name: this.myForm.firstName.value,
      // email:this.myForm.email.value,
    })
    .then(() => {
      this.toastr.success("Photo added successfully");
      this.router.navigateByUrl("photos/all-photos");
    })
    .catch((err) => {
      this.toastr.error("Oopsss");
    });
    // const uid = uuidv4();
    // this.db.object(`/photos`).set({
    // })
  }
  
  public picture:any = '../../../assets/Ajju-goa.webp'

  @ViewChild('fileInput') fileInput: ElementRef;
    
  // upLoadfile(event) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.picture = reader.result;
  //   }
  // }

  async upLoadfile(event) {
    this.isLoading = true;
    const file = event.target.files[0];

    let resizedImage = await readAndCompressImage(file, imgConfig);

    const filePath = 'files/' + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, resizedImage);
    task.percentageChanges().subscribe((percentage) => {
      this.uploadPercent = percentage;
    });
  
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          this.picture = url;
          this.isLoading = false
        });
      })
    )
    .subscribe();
  }
  

  editFile() {
    this.picture = '../../../assets/Ajju-goa.webp'
    this.fileInput.nativeElement.value = null;
  }
  removeFile() {
    this.picture = '../../../assets/Ajju-goa.webp'
    this.fileInput.nativeElement.value = null;
  }
}


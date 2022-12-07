import { Component, OnInit } from "@angular/core";

import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
//services
import { AuthService } from "src/app/Services/auth.service";
import { AlertService } from 'src/app/Services/alert.service';

//angular form
import { NgForm } from "@angular/forms";

import { finalize } from "rxjs/operators";
//firebase
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFireDatabase } from "@angular/fire/compat/database";

//browser image resizer
import { readAndCompressImage } from "browser-image-resizer";
import { imgConfig } from "src/utils/config";

//uuid
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: 'app-add-insta-post',
  templateUrl: './add-insta-post.component.html',
  styleUrls: ['./add-insta-post.component.css']
})
export class AddInstaPostComponent implements OnInit {

  loading: boolean = false;
  locationName: string;
  description: string;
  picture: string = null;

  user = null;
  uploadPercent: number = null;

  constructor(
    private db: AngularFireDatabase,
    private strorage: AngularFireStorage,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
  ) {
    auth.getUser().subscribe((user) => {
      this.db.object(`/loginposts/${user.uid}`)
        .valueChanges()
        .subscribe((user) => {
          this.user = user;
        });
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const uid = uuidv4();

    this.db.object(`/posts/${uid}`)
      .set({
        id: uid,
        locationName: this.locationName,
        description: this.description,
        picture: this.picture,
        by: this.user.name,
        instaId: this.user.instaId,
        date: Date.now(),
      })
      .then(() => {
        this.toastr.success("Post added successfully");
        this.router.navigateByUrl("/admin/allPostsInOnePlace");
      })
      .catch((err) => {
        this.toastr.error("Oopsss");
      });
  }

  async uploadFile(event) {
    const file = event.target.files[0];

    let resizedImage = await readAndCompressImage(file, imgConfig);

    const filePath = file.name;
    const fileRef = this.strorage.ref(filePath);

    const task = this.strorage.upload(filePath, resizedImage);

    task.percentageChanges().subscribe((percentage) => {
      this.uploadPercent = percentage;
    });

    task.snapshotChanges().pipe(
      finalize(() => {
        this.loading = true;
        fileRef.getDownloadURL().subscribe((url) => {
          this.picture = url;
          this.loading = false;
          this.toastr.success("Image upload Success");
        });
      }),
    ).subscribe();
  }

}

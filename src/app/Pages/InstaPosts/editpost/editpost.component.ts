import { Component, OnInit } from "@angular/core";

import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
//services
import { AuthService } from "src/app/appServices/auth.service";
import { AlertService } from 'src/app/appServices/alert.service';

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
import { CommonService } from "src/app/shared/sharedServices/common.service";
import { InstapostService } from "src/app/appServices/instapost.service";

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {

  loading: boolean = false;
  locationName: string;
  description: string;
  picture: string = null;

  user = null;
  uploadPercent: number = null;
  postView: unknown;

  constructor(
    private db: AngularFireDatabase,
    private strorage: AngularFireStorage,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
    private commonService: CommonService,
    private instaService:InstapostService
  ) { 
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let uid = uuidv4();

    this.db.object(`/posts/${uid}`).update({
      id: uid,
      locationName: this.locationName,
      description: this.description,
      picture: this.picture,
      by: this.user.name,
      instaId: this.user.instaId,
      date: Date.now(),
    })
      .then((res) => {
      this.toastr.success('Post Updated Successfully')
      this.router.navigateByUrl('/instagram')
      })
      .catch((err) => {
      this.toastr.error(err.message)
    })
  }

  getSinglePost(itemId,data) {
    return this.instaService.updateSinglePost(itemId,data).then((res) => {
      this.postView = res;
    }, (err) => {
      this.commonService.pressMe(err.message)
    })
  }


  uploadFile(event: Event){}
}

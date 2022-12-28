import { Component, OnChanges, OnInit,OnDestroy, SimpleChanges } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/appServices/auth.service';
import { CommonService } from 'src/app/shared/sharedServices/common.service';
//uuid
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: 'app-all-post-stories-in-one-place',
  templateUrl: './all-post-stories-in-one-place.component.html',
  styleUrls: ['./all-post-stories-in-one-place.component.css']
})
export class AllPostStoriesInOnePlaceComponent implements OnInit,OnDestroy {

  public loading = false;
  posts = [];

  constructor(
    private db: AngularFireDatabase,
    private toastr: ToastrService,
    public commonService:CommonService,
  ) {
    this.loading = true;


    //grab all posts from firebase

    db.object("/posts")
      .valueChanges()
      .subscribe((obj) => {
        if (obj) {
          this.posts = Object.values(obj).sort((a, b) => b.date - a.date);
          this.loading = false;
        } else {
          toastr.error("NO post to display");
          this.posts = [];
          this.loading = false;
        }
      });
  }
  ngOnInit(): void {
    this.commonService.goToAdmin.next({text:'Go To Insta',url:'instagram/addInstaPost'})
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.commonService.goToAdmin.next({text:'',url:''})
  }

  
  deletePost(event) {
    // this.db.object(`/posts/${this.posts.}`);
  }
}

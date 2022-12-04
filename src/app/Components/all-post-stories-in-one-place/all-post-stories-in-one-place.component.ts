import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { faThumbsUp,faThumbsDown,faShareSquare } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-all-post-stories-in-one-place',
  templateUrl: './all-post-stories-in-one-place.component.html',
  styleUrls: ['./all-post-stories-in-one-place.component.css']
})
export class AllPostStoriesInOnePlaceComponent implements OnInit,OnChanges {

  public loading = false;
  posts: any = [];
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faShareSquare = faShareSquare;
  uid = null;
  upVote = 0;
  downVote = 0;


  constructor(
    private _db: AngularFireDatabase,
    private _toastr: ToastrService,
    private _authService:AuthService,
  ) {
    this._authService.getUser().subscribe((user) => {
      this.uid = user?.uid;
      console.log('this is uid : ' + this.uid);
      
    })


    _db.object('/posts').valueChanges().subscribe((obj) => {
      if (obj) {
      this.posts = Object.values(obj).sort((a,b) => b.date - a.date)
      } else {
        this._toastr.error('No posts Found')
        this.posts = []
      }
    })
  }


  ngOnInit(): void {
  }


  ngOnChanges(): void {
    if (this.posts.vote) {
      Object.values(this.posts.vote).map((val: any) => {
        if (val.upVote) {
          this.upVote ++
        }
        if (val.downVote) {
          this.downVote += 1
        }
      })
    }
  }
  upVotePost() {
    this._db.object(`/posts/${this.posts.id}/vote/${this.uid}`).set({
      upVote: 1,
    })
  }

  downVotePost() {
    this._db.object(`/posts/${this.posts.id}/vote/${this.uid}`).set({
      downVote: 1,
    })
  }

  getInstaUrl() {
    return `https://instagram.com/${this.posts.instaId}`
  }

}

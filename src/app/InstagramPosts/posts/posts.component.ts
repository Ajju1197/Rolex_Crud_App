import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

// npm install @fortawesome/free-regular-svg-icons
import {
  faThumbsUp,
  faThumbsDown,
  faShareSquare,
} from '@fortawesome/free-regular-svg-icons';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from 'src/app/Services/auth.service';
import { CommonService } from 'src/app/shared/sharedServices/common.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  isFlip: boolean;
  @Input()
  post;

  @Output() notifyDelete: EventEmitter<any> = new EventEmitter<any>();


  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faShareSquare = faShareSquare;

  uid = null;

  upvote = 0;
  downvote = 0;

  constructor(private db: AngularFireDatabase, private auth: AuthService,public commonService:CommonService) {
    this.auth.getUser().subscribe((user) => {
      this.uid = user?.uid;
    });
  }
  
  ngOnInit(): void {
  }

  //TODO: bug in updating the changes
  ngOnChanges(): void {
    if (this.post.vote) {
      Object.values(this.post.vote).map((val: any) => {
        if (val.upvote) {
          this.upvote += 1;
        }
        if (val.downvote) {
          this.downvote += 1;
        }
      });
    }
  }

  upvotePost() {
    console.log('UPVOTING');
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      upvote: 1,
    });
  }

  downvotePost() {
    console.log('DOWNVOTING');
    this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({
      downvote: 1,
    });
  }

  getInstaUrl() {
    return `https://instagram.com/${this.post.instaId}`;
  }


  deletePost(id) {
    console.log('ajju');
    
    this.notifyDelete.emit(id)
  }

  flipCard() {
    this.isFlip =! this.isFlip
  }
  //create product addtocart html

}

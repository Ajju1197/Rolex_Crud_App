import { Component, OnInit, Input, OnChanges, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

// npm install @fortawesome/free-regular-svg-icons
import {
  faThumbsUp,
  faThumbsDown,
  faShareSquare,
} from '@fortawesome/free-regular-svg-icons';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from 'src/app/appServices/auth.service';
import { CommonService } from 'src/app/shared/sharedServices/common.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  animations: [
    trigger('dialogAnimation', [
      transition('void => *', [
        style({ transform: 'scale(0.3)', opacity: 0 }),
        animate('.5s cubic-bezier(.35,0,.25,1)', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition('* => void', [
        animate('.5s cubic-bezier(.35,0,.25,1)', style({ transform: 'scale(0.3)', opacity: 0 }))
      ])
    ])
  ]
})
export class PostsComponent implements OnInit {

  isFlip: boolean;
  @Input() post;

  @Output() notifyDelete: EventEmitter<any> = new EventEmitter<any>();


  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faShareSquare = faShareSquare;

  uid = null;

  upvote = 0;
  downvote = 0;
  postView: any;
  fullUrl: string;
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

  constructor(private db: AngularFireDatabase, private auth: AuthService,public commonService:CommonService,private dialog:MatDialog) {
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
    this.db.object('/posts/' + id).remove();
  }

  flipCard() {
    this.isFlip =! this.isFlip
  }

  openDialog(fullUrl:string) {
    this.fullUrl = fullUrl;
    this.dialog.open(this.dialogTemplate)
  }
}

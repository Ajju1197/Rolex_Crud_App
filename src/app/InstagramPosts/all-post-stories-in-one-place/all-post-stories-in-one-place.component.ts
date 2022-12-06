import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-all-post-stories-in-one-place',
  templateUrl: './all-post-stories-in-one-place.component.html',
  styleUrls: ['./all-post-stories-in-one-place.component.css']
})
export class AllPostStoriesInOnePlaceComponent implements OnInit {

  public loading = false;
  posts = [];


  constructor(
    private db: AngularFireDatabase,
    private toastr: ToastrService,
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
  }

}

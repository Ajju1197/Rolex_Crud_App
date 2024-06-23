import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/appServices/firebase.service';
import { CommonService } from 'src/app/shared/sharedServices/common.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { slideBottomElementAnimation } from 'src/app/Animations/animation';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
  animations: [ slideBottomElementAnimation,
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
export class PhotosComponent implements OnInit {
  public allPhotos: any;
  fullUrl: string;
  @ViewChild('dialogTemplate', { static: true }) dialogTemplate: TemplateRef<any>;
  items = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  startIndex = 0;
  endIndex = this.itemsPerPage;


  constructor(private _fbService:FirebaseService,public _commonService:CommonService,private dialog: MatDialog,private db:AngularFireDatabase) { }

  ngOnInit(): void {
    this.getPhotos()
    this._commonService.goToAddPhotos.next({text:'Go to Add Photos',url:'photos/add-photos'})
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._commonService.goToAddPhotos.next({text:'',url:''})
  }

  getPhotos() {
    this.allPhotos = this._fbService.getAll();
  }

  
  openDialog(fullUrl: string) {
    this.fullUrl = fullUrl;
    this.dialog.open(this.dialogTemplate)
  }
  
}

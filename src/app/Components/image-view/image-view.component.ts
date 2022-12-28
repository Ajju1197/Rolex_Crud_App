import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/appServices/alert.service';
import { UsersService } from 'src/app/appServices/users.service';
import { IAlbums } from 'src/app/Modals/IUser';



@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {

  albumId: any;
  album: IAlbums = {} as IAlbums;
  constructor(private userService:UsersService,private _route:ActivatedRoute,private alertService:AlertService) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe((param) => {
      this.albumId = param.get('albumId')
    })
    this.userService.getAlbum(this.albumId).subscribe((img) => {
      this.album = img
      console.log(this.album);
    }, (err) => {
      this.alertService.error(err)
    })
  }

}

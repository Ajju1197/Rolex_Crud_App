import { trigger, transition, style, animate, state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { IAlbums } from 'src/app/Modals/IUser';
import { AlertService } from 'src/app/Services/alert.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {

  albums: any;
  loading: boolean;
  searchStringAlbum: string = '';
  erroMessage: any;
  constructor(private alertServices:AlertService,private _userService: UsersService, private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loading = true;
    this._httpClient.get<any>('assets/Albums/album.json').pipe(delay(2000)).subscribe((data) => {
      this.alertServices.success('Images fetched successfully');
      this.albums = data
      console.log(this.albums)
      this.loading = false;
    }, (err) => this.alertServices.error(err));
  }
  searchAlbumValue(stringValue: string) {
    this.searchStringAlbum = stringValue;
  }
}

import { trigger, transition, style, animate, state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAlbums } from 'src/app/Modals/IUser';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {

  albums: any;
  loading: boolean;
  erroMessage: any;
  constructor(private _userService: UsersService, private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this._httpClient.get<any>('assets/Albums/album.json').subscribe((data) => {
      this.albums = data
      console.log(this.albums)
    })
    // this.getAllAlbums();
  }

  // getAllAlbums() {
  //   this.loading = true;
  //   this._userService.getAllAlbums().subscribe((data) => {
  //     this.albums = data;
  //     console.log(this.albums)
  //     this.loading = false;
  //   }, (err) => { this.erroMessage = err })
  // }
}

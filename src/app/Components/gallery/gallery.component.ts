import { trigger, transition, style, animate, state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
  showNotifications: boolean = false;
  alertMessage:string = "Images fetched Successfully"
  redalertMessage: string = "There is an Error to fetch Images"
  public premium = "Premium"
  public normal = "Normal"
  public images = "Images"
  public albumCountRadioButtonSelected = 'All'
  constructor(private alertServices:AlertService,private _userService: UsersService, private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loading = true;
    this._httpClient.get<any>('assets/Albums/album.json').pipe(delay(2000)).subscribe((data) => {
      this.alertServices.success('Images fetched successfully');
      this.showNotifications = true;
      this.albums = data
      console.log(this.albums)
      this.loading = false;
      setTimeout(() => {
        this.showNotifications = false;
      }, 4000)
    }, (err) => this.alertServices.error(err));
  }
  searchAlbumValue(stringValue: string) {
    this.searchStringAlbum = stringValue;
  }
  deleteNotification(value: string) {
    this.showNotifications = false;
  }

  getAllAlbums() {
    return this.albums.length;
  }
  getAllPremiumAlbums() {
    return this.albums.filter(img => img.type === 'Premium').length
  }
  getAllNormalAlbums() {
    return this.albums.filter(img => img.type === 'Normal').length
  }
  onFilterRadioButtonSelectionChange(data:any) {
    this.albumCountRadioButtonSelected = data;
    console.log(data);
  }

}

import { trigger, transition, style, animate, state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { delay, Observable } from 'rxjs';
import { IAlbums } from 'src/app/Modals/IUser';
import { AlertService } from 'src/app/appServices/alert.service';
import { UsersService } from 'src/app/appServices/users.service';
import { CommonService } from 'src/app/shared/sharedServices/common.service';
import { fade } from 'src/app/Animations/animation';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  animations:[fade]
})
export class GalleryComponent implements OnInit,OnDestroy {

  albums: IAlbums[]=[];
  public loading: boolean;
  searchStringAlbum: string = '';
  erroMessage: any;
  showNotifications: boolean = false;
  redalertMessage: string = "There is an Error to fetch Images"
  public premium = "Premium"
  public normal = "Normal"
  public images = "Images"
  public albumCountRadioButtonSelected = 'All'

  // Pagination
  currentPage = 1;
  itemsPerPage = 3;
  totalPages = 1;

  startIndex = 0;
  endIndex = this.itemsPerPage;


  constructor(
    private alertServices: AlertService,
    private _userService: UsersService,
    private _httpClient: HttpClient,
    public commonService: CommonService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this._userService.getAllAlbums().subscribe((img) => {
      // this.alertServices.success('Watches fetched successfully');
      this.toastr.success('Watches fetched successfully')
      this.showNotifications = true;
      this.albums = img
      this.totalPages = Math.ceil(this.albums.length / this.itemsPerPage);
      this.loading = false;
      setTimeout(() => {
        this.showNotifications = false;
      }, 4000)
    }, (err) => 
    {
      // this.alertServices.error(err)
      this.toastr.error(err.message)
    });

    this.commonService.goToAdmin.next({ text: 'Go To Admin', url: '' })
  }
  // searchAlbumValue(stringValue: string) {
  //   this.searchStringAlbum = stringValue;
  // }
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.commonService.goToAdmin.next({ text: '', url: '' })
  }

  previousPage() {
    if (this.currentPage) {
      this.currentPage--;
      this.startIndex -= this.itemsPerPage;
      this.endIndex -= this.itemsPerPage;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.startIndex += this.itemsPerPage;
      this.endIndex += this.itemsPerPage;
      }
  }
}

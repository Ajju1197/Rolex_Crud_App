import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public darkTheme: boolean;
  public showHidePages: boolean= false;
  constructor() { }

  setMessage(data) {
    this.darkTheme = data;
  }
  getMessage() {
    return this.darkTheme;
  }

  // LoggedIn User Name 
  loggedInUserName = new BehaviorSubject('');


  // For go back Link
  gobackLink = new BehaviorSubject({ text: '', url: '' })
  
  // For go back Link
  goToCart = new BehaviorSubject({ text: '', url: '' })
  
  // For Search Input in Navbar
  searchInputValue :string = '';

  // For go back to Admin
  goToAdmin = new BehaviorSubject({ text: '', url: '' })
}

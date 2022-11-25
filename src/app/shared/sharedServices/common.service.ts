import { Injectable } from '@angular/core';

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
}

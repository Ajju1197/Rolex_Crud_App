import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public darkTheme: boolean;
  constructor() { }

  setMessage(data) {
    this.darkTheme = data;
  }
  getMessage() {
    return this.darkTheme;
  }
}

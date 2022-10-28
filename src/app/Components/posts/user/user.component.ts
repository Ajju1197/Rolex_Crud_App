import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/Modals/IUser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input()
  filterUsers: IUser[];
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/Modals/IUser';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {

  @Input()
  filterUsers: IUser[];
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchString: string = '';
  isSearch: boolean = true;
  constructor() { }

  @Output()
  searchPosts:EventEmitter<any> = new EventEmitter<any>()

  ngOnInit(): void {
  }

  onSearch() { 
    this.searchPosts.emit(this.searchString)
  }

  onSearchPost() {
    this.isSearch = !this.isSearch
  }

}
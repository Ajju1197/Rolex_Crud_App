import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() public posts: string;
  @Input() public premium: string;
  @Input() public normal: string;
  @Input() public all: number = 0;
  @Input() public premiumCount: number = 0;
  @Input() public normalCount: number = 0;
  @Input() public aboveFiveHundredDollar:string;
  public selectedRadioButtonValue = 'All';
  // public selectedRadioButtonValueForDollar = 'DollarFiveHundred'
  @Output() filterRadioButtonSelectionChange: EventEmitter<any> = new EventEmitter<any>()
  // @Output() filterRadioButtonSelectionChangeForDollarFiveHundred: EventEmitter<any> = new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {
  }

  onFilterRadioButtonSelectionChanging() {
    this.filterRadioButtonSelectionChange.emit(this.selectedRadioButtonValue)
  }
  // onSelectedRadioButtonValueForDollar() {
  //   this.filterRadioButtonSelectionChangeForDollarFiveHundred.emit(this.selectedRadioButtonValueForDollar)
  // }

}

import { Directive, ElementRef, Renderer2,HostBinding,HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  
  @HostBinding('class.active1') activeClass;
  // @HostBinding('class.active1') activeClass;

  @HostListener('click') myClick() {
    this.activeClass = !this.activeClass
  }
  
}

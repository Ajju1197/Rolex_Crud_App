import { Directive, ElementRef, Renderer2,HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeBgColor]'
})
export class ChangeBgColorDirective {

  constructor(private el:ElementRef,private renderer:Renderer2) { }

  @HostListener('click') changeBgColor(color) {
    this.renderer.setStyle(this.el.nativeElement,'backgroundColor',color)
  }
}

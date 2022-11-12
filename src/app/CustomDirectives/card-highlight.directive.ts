import { Directive, ElementRef ,HostBinding,HostListener,Input,OnInit,Renderer2} from '@angular/core';

@Directive({
  selector: '[appCardHighlight]'
})
export class CardHighlightDirective implements OnInit{

  constructor(private elementRef:ElementRef,private renderer: Renderer2) { }

  @Input() backgroundColor: string = "#48e6a8";
  @Input() textColor: string = "#ffffff";
  @Input() divPadding: string = "10px 5px";
  @Input() divPaddingNormal:string = "2px 5px"
  @Input() hoverBackgroundColor: string = "#012970";
  @Input() hoverTextColor: string = "#000000";
  @Input() backgroundColorTransition: string = "all 0.5s ease-in-out";
  @Input() displayFlex: string = "flex";
  @Input() justifyCenter: string = "center";
  @Input() justifyStart: string = "flex-start";
  @Input() translateXCenter:string = "translateX(50%)";
  @Input() translateXNormal:string = "translateX(0%)";

  @HostBinding('style.transition') bgColorTransition: string;
  @HostBinding('style.backgroundColor') bgColor: string;
  @HostBinding('style.color') txtColor: string;
  @HostBinding('style.padding') dvPadding: string;
  @HostBinding('style.display') display: string;
  @HostBinding('style.justify-content') justifyContent: string;
  @HostBinding('style.transform') transform: string;

  ngOnInit() {
    this.bgColorTransition = this.backgroundColorTransition;
    this.bgColor = this.backgroundColor;
    this.txtColor = this.textColor;
    this.dvPadding = this.divPaddingNormal;
    // this.display = this.displayFlex;
  }
  
  @HostListener('mouseenter') onMouseEnter(eventData: Event) {
    this.bgColorTransition = this.backgroundColorTransition;
    this.bgColor = this.hoverBackgroundColor;
    this.txtColor = this.hoverTextColor;
    this.dvPadding = this.divPadding;
    // this.justifyContent = this.justifyCenter;
    // this.transform = this.translateXCenter;
  }
  @HostListener('mouseleave') onMouseLeave(eventData: Event) { 
    this.bgColorTransition = this.backgroundColorTransition;
    this.bgColor = this.backgroundColor;
    this.txtColor = this.textColor;
    this.dvPadding = this.divPaddingNormal;
    // this.justifyContent = this.justifyStart;
    // this.transform = this.translateXNormal;
  }
}

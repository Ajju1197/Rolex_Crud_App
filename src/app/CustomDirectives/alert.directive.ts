import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAlert]'
})
export class AlertDirective {

  constructor(private template:TemplateRef<any>,private viewContainer:ViewContainerRef) { }

  @Input('appAlert') set displayView(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.template);
    } else {
      this.viewContainer.clear();
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesLazyloadRoutingModule } from './images-lazyload-routing.module';
import { ImagesLazyloadComponent } from './images-lazyload.component';
import { ImagesLazyloadDirective } from '../images-lazyload.directive';


@NgModule({
  declarations: [
    ImagesLazyloadComponent,
    ImagesLazyloadDirective
  ],
  imports: [
    CommonModule,
    ImagesLazyloadRoutingModule
  ],
  exports: [ImagesLazyloadDirective],
})
export class ImagesLazyloadModule { }

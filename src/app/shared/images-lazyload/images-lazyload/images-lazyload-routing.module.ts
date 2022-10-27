import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagesLazyloadComponent } from './images-lazyload.component';

const routes: Routes = [{ path: '', component: ImagesLazyloadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesLazyloadRoutingModule { }

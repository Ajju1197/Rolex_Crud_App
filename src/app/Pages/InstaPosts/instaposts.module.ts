import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstapostsRoutingModule } from './instaposts-routing.module';
import { AllPostStoriesInOnePlaceComponent } from './all-post-stories-in-one-place/all-post-stories-in-one-place.component';
import { AddInstaPostComponent } from './add-insta-post/add-insta-post.component';
import { EditpostComponent } from './editpost/editpost.component';
import { PostsComponent } from './posts/posts.component';
import { MeterialModule } from 'src/app/shared/sharedModules/meterial/meterial.module';
import { AppModulesModule } from 'src/app/shared/sharedModules/app-modules/app-modules.module';


@NgModule({
  declarations: [
    AllPostStoriesInOnePlaceComponent,
    AddInstaPostComponent,
    EditpostComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    InstapostsRoutingModule,
    MeterialModule,
    AppModulesModule,

  ]
})
export class InstapostsModule {
  constructor() {
    console.log('Instagram Modules Loaded');
  }
}

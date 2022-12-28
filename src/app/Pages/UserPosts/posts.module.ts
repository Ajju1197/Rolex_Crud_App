import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { UserComponent } from './user/user.component';
import { MeterialModule } from 'src/app/shared/sharedModules/meterial/meterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardHighlightDirective } from 'src/app/CustomDirectives/card-highlight.directive';
import { AlertDirective } from 'src/app/CustomDirectives/alert.directive';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { AppModulesModule } from 'src/app/shared/sharedModules/app-modules/app-modules.module';




@NgModule({
  declarations: [
    PostsComponent,
    UserComponent,
    ViewComponent,
    AddComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MeterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppModulesModule,
  ],
  exports: [],
})
export class PostsModule { 
  constructor() {
    console.log('User Post Modules Loaded');
    
  }
}

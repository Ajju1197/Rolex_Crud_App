import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { UserComponent } from './user/user.component';
import { MeterialModule } from 'src/app/meterial/meterial.module';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { SearchComponent } from '../search/search.component';
import { CardHighlightDirective } from 'src/app/CustomDirectives/card-highlight.directive';
import { AlertDirective } from 'src/app/CustomDirectives/alert.directive';



@NgModule({
  declarations: [
    PostsComponent,
    UserComponent,
    SpinnerComponent,
    SearchComponent,
    CardHighlightDirective,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MeterialModule,
    FormsModule,
  ],
  exports: [SpinnerComponent,SearchComponent,CardHighlightDirective],
})
export class PostsModule { }

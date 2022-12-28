import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { AddInstaPostComponent } from './add-insta-post/add-insta-post.component';
import { AllPostStoriesInOnePlaceComponent } from './all-post-stories-in-one-place/all-post-stories-in-one-place.component';
import { EditpostComponent } from './editpost/editpost.component';

const routes: Routes = [
  { path: '', component: AllPostStoriesInOnePlaceComponent },
  { path: 'addInstaPost', component: AddInstaPostComponent,},
  { path: 'editInstaPost/:instaId',component:EditpostComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstapostsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { AddComponent } from './Components/add/add.component';
import { AdminComponent } from './Components/admin/admin.component';
import { EditComponent } from './Components/edit/edit.component';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { ImageViewComponent } from './Components/image-view/image-view.component';
import { LoginComponent } from './Components/Logins/login/login.component';
import { RegisterComponent } from './Components/Logins/register/register.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ViewComponent } from './Components/view/view.component';
// AngularFireAuthGuard
import { AngularFireAuthGuard,redirectUnauthorizedTo,redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { AddInstaPostComponent } from './Components/add-insta-post/add-insta-post.component';
import { AllPostStoriesInOnePlaceComponent } from './Components/all-post-stories-in-one-place/all-post-stories-in-one-place.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: { animation: 'HomePage',authGuardPipe: redirectUnauthorizedToLogin },
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInHome }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data:{ authGuardPipe:redirectLoggedInHome }
  },
  { path: 'admin/view/:userId', component: ViewComponent, data: { animation: 'AboutPage' } },
  { path: 'admin/about', component: AboutComponent, data: { animation: 'AboutPage' } },
  { path: 'admin/edit', component: EditComponent },
  { path: 'admin/edit/:userId', component: EditComponent },
  {
    path: 'admin/add',
    component: AddComponent,
    canActivate: [AngularFireAuthGuard],
    data:{ authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'admin/addInstaPost',
    component: AddInstaPostComponent,
    canActivate: [AngularFireAuthGuard],
    data:{ authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'admin/allPostsInOnePlace',
    component: AllPostStoriesInOnePlaceComponent,
    canActivate: [AngularFireAuthGuard],
    data:{ authGuardPipe: redirectUnauthorizedToLogin }
  },
  { path: 'admin/albums', component: GalleryComponent },
  { path: 'admin/album/:albumId', component: ImageViewComponent },
  { path: 'admin/posts', loadChildren: () => import('./Components/posts/posts.module').then(m => m.PostsModule) },
  { path: 'lazyimages', loadChildren: () => import('./shared/images-lazyload/images-lazyload/images-lazyload.module').then(m => m.ImagesLazyloadModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

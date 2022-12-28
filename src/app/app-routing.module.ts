import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Pages/about/about.component';
import { AddComponent } from './Pages/UserPosts/add/add.component';
import { AdminComponent } from './Pages/admin/admin.component';
import { EditComponent } from './Pages/UserPosts/edit/edit.component';
import { GalleryComponent } from './Pages/gallery/gallery.component';
import { ImageViewComponent } from './Components/image-view/image-view.component';
import { LoginComponent } from './Pages/Logins/login/login.component';
import { RegisterComponent } from './Pages/Logins/register/register.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ViewComponent } from './Pages/UserPosts/view/view.component';
// AngularFireAuthGuard
import { AngularFireAuthGuard,redirectUnauthorizedTo,redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { SignInsignUpauthComponent } from './Authentications/sign-insign-upauth/sign-insign-upauth.component';
import { AddPhotosComponent } from './Pages/Photos/add-photos/add-photos.component';
import { PhotosComponent } from './Pages/Photos/photos/photos.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'about', component: AboutComponent,
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    canActivate: [AngularFireAuthGuard],},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInHome }
  },
  {
    path: 'signIn',
    component: SignInsignUpauthComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data:{ authGuardPipe:redirectLoggedInHome }
  },


  //====================== Posts Routing ===================//
  { path: 'posts', loadChildren: () => import('./Pages/UserPosts/posts.module').then(m => m.PostsModule),canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  // ====================== Posts Routing End===================//


   // ============= Shopping Routing ================//
   { path: 'products', loadChildren: () => import('./Pages/ShoppingCart/shopping.module').then(m => m.ShoppingModule),canActivate: [AngularFireAuthGuard],
   data:{ authGuardPipe: redirectUnauthorizedToLogin } },
 // ============= Shopping Routing End ================ //


  // ============Photos Routing============== //
  {
    path: 'photos', children: [
      {
        path: 'all-photos',
        component: PhotosComponent,
      },
      {
        path: 'add-photos',
        component: AddPhotosComponent,
      },
    ],
    canActivate: [AngularFireAuthGuard],
    data:{ authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: '', children: [
      { path: 'albums', component: GalleryComponent },
      { path: 'album/:albumId', component: ImageViewComponent },
    ],canActivate: [AngularFireAuthGuard], data:{ authGuardPipe: redirectUnauthorizedToLogin }
  },
  { path: 'lazyimages', loadChildren: () => import('./shared/images-lazyload/images-lazyload/images-lazyload.module').then(m => m.ImagesLazyloadModule) },
// =========Photo Routing End============== //


// ===========InSta Posts Routing==================== //
  { path: 'instagram', loadChildren: () => import('./Pages/InstaPosts/instaposts.module').then(m => m.InstapostsModule), canActivate: [AngularFireAuthGuard],
    data:{ authGuardPipe: redirectUnauthorizedToLogin } },
// =========== InSta Posts Routing End ==================== //
  

// =========== Page Not Found ================//
  { path: '**', component:PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

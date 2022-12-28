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
import { AddInstaPostComponent } from './InstagramPosts/add-insta-post/add-insta-post.component';
import { AllPostStoriesInOnePlaceComponent } from './InstagramPosts/all-post-stories-in-one-place/all-post-stories-in-one-place.component';
import { EditpostComponent } from './InstagramPosts/editpost/editpost.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { ProductsComponent } from './Components/ShoppingCart/products/products.component';
import { CartComponent } from './Components/ShoppingCart/cart/cart.component';
import { ProductViewComponent } from './Components/ShoppingCart/product-view/product-view.component';
import { AuthenticationComponent } from './Authentications/authentication/authentication.component';
import { SignInsignUpauthComponent } from './Authentications/sign-insign-upauth/sign-insign-upauth.component';
import { AddPhotosComponent } from './Pages/Photos/add-photos/add-photos.component';
import { PhotosComponent } from './Pages/Photos/photos/photos.component';

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
    path: 'about', component: AboutComponent,
    data: { animation: 'AboutPage', authGuardPipe: redirectUnauthorizedToLogin },
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
  { path: 'posts', loadChildren: () => import('./Components/posts/posts.module').then(m => m.PostsModule),canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'posts', children: [
      { path: 'add', component: AddComponent },
      { path: 'view/:userId', component: ViewComponent, data: { animation: 'AboutPage' } },
      { path: 'edit/:userId', component: EditComponent },
    ],canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  // ====================== Posts Routing End===================//


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
{
  path: 'allPostsInOnePlace',component: AllPostStoriesInOnePlaceComponent,
    canActivate: [AngularFireAuthGuard],
    data:{ authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: '', children: [
      {
        path: 'addInstaPost', component: AddInstaPostComponent,
      },
      {
        path: 'editInstaPost', component: EditpostComponent,
      },
    ],
    canActivate: [AngularFireAuthGuard],
    data:{ authGuardPipe: redirectUnauthorizedToLogin }
  },
  // =========== InSta Posts Routing End ==================== //


 // ============= Shopping Routing ================//
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AngularFireAuthGuard],
    data:{ authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: '', children: [
      { path: 'cart', component: CartComponent,canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin }}
    ]
  },
// ============= Shopping Routing End ================//
  

//======================== Child Routes====================//
{
  path: '', children: [
    { path: 'product/:productId', component: ProductViewComponent },
    { path: 'editInstaPost/:instaId',component:EditpostComponent},
  ],canActivate: [AngularFireAuthGuard],
  data:{ authGuardPipe: redirectUnauthorizedToLogin }
},
//======================== Child Routes End ====================//


// =========== Page Not Found ================//
  { path: '**', component:PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

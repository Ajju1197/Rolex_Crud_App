import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { AddComponent } from './Components/add/add.component';
import { AdminComponent } from './Components/admin/admin.component';
import { EditComponent } from './Components/edit/edit.component';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ViewComponent } from './Components/view/view.component';

const routes: Routes = [
  { path: '', component: AdminComponent, data: { animation: 'HomePage' } },
  { path: 'login', component: LoginComponent },
  { path: 'admin/view/:userId', component: ViewComponent, data: { animation: 'AboutPage' } },
  { path: 'admin/about', component: AboutComponent, data: { animation: 'AboutPage' } },
  { path: 'admin/edit', component: EditComponent },
  { path: 'admin/add', component: AddComponent },
  { path: 'admin/edit', component: EditComponent },
  { path: 'admin/albums', component: GalleryComponent, data: { animation: 'AlbumsPage' } },
  { path: 'admin/posts', loadChildren: () => import('./Components/posts/posts.module').then(m => m.PostsModule) },
  { path: 'lazyimages', loadChildren: () => import('./shared/images-lazyload/images-lazyload/images-lazyload.module').then(m => m.ImagesLazyloadModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

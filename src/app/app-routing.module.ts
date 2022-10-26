import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './Components/add/add.component';
import { AdminComponent } from './Components/admin/admin.component';
import { EditComponent } from './Components/edit/edit.component';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ViewComponent } from './Components/view/view.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/view', component: ViewComponent },
  { path: 'admin/edit', component: EditComponent },
  { path: 'admin/add', component: AddComponent },
  { path: 'admin/edit', component: EditComponent },
  { path: 'admin/albums', component: GalleryComponent },
  { path: 'admin/posts', loadChildren: () => import('./Components/posts/posts.module').then(m => m.PostsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

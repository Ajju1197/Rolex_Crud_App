import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { PostsComponent } from './posts.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
    {path:'',component:PostsComponent },
    { path: 'add', component: AddComponent },
    { path: 'view/:userId', component: ViewComponent, data: { animation: 'AboutPage' } },
    { path: 'edit/:userId', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }

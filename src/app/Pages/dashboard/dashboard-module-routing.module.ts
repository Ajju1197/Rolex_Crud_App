import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModuleComponent } from './dashboard-module.component';
import { DashboardUserDetailsComponent } from './dashboard-user-details/dashboard-user-details.component';

const routes: Routes = [
  { path: '', component: DashboardModuleComponent },
  { path:'dashboardUser/:id', component:DashboardUserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }

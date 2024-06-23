import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { DashboardModuleComponent } from './dashboard-module.component';
import { FormsModule } from '@angular/forms';
import { DashBoardDetailsInfoComponent } from './dash-board-details-info/dash-board-details-info.component';
import { DashboardUserDetailsComponent } from './dashboard-user-details/dashboard-user-details.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DashboardModuleComponent,
    DashBoardDetailsInfoComponent,
    DashboardUserDetailsComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers:[]
})
export class DashboardModuleModule { }

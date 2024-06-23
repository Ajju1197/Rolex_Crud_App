import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YoutubeRoutingModule } from './youtube-routing.module';
import { YoutubeComponent } from './youtube.component';
// Ag grid Module
import { AgGridModule } from 'ag-grid-angular';
import { AppModulesModule } from 'src/app/shared/sharedModules/app-modules/app-modules.module';


@NgModule({
  declarations: [
    YoutubeComponent
  ],
  imports: [
    CommonModule,
    YoutubeRoutingModule,
    AgGridModule,
    AppModulesModule,
  ]
})
export class YoutubeModule { }

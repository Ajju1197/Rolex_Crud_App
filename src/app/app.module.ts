import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './Components/admin/admin.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'
import { UsersService } from './Services/users.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeterialModule } from './meterial/meterial.module';
import { UserComponentComponent } from './Components/user-component/user-component.component';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    FooterComponent,
    NavbarComponent,
    UserComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MeterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UsersService,
    MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
    {
      provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
      useValue: MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// firebase related modules
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './Pages/admin/admin.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'
import { UsersService } from './appServices/users.service';
// Toastrmodule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { MeterialModule } from './shared/sharedModules/meterial/meterial.module';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';
import { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Pages/Logins/login/login.component';
import { LogoutComponent } from './Pages/Logins/logout/logout.component';
import { FilterUsersPipe } from './Pipes/filter-users.pipe';
import { GalleryComponent } from './Pages/gallery/gallery.component';
import { AboutComponent } from './Pages/about/about.component';
import { NgOptimizedImage, PRECONNECT_CHECK_BLOCKLIST } from '@angular/common';
import { AlertDirective } from './CustomDirectives/alert.directive';
import { AlertComponent } from './CustomDirectives/alert/alert.component';
import { AlertService } from './appServices/alert.service';
import { CardHighlightDirective } from './CustomDirectives/card-highlight.directive';
import { MatIconModule } from '@angular/material/icon';
import { AlertDirectiveComponent } from './CustomDirectives/alert-directive/alert-directive.component';
import { FilterComponent } from './Components/filter/filter.component';
import { ImageViewComponent } from './Components/image-view/image-view.component';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './Pages/Logins/register/register.component';
import { AuthService } from './appServices/auth.service';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';

// Loading Bar
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { AuthenticationComponent } from './Authentications/authentication/authentication.component';
import { SignInsignUpauthComponent } from './Authentications/sign-insign-upauth/sign-insign-upauth.component';
import { PhotosComponent } from './Pages/Photos/photos/photos.component';
import { AddPhotosComponent } from './Pages/Photos/add-photos/add-photos.component';
import { SearchComponent } from './Components/search/search.component';
import { AppModulesModule } from './shared/sharedModules/app-modules/app-modules.module';
import { DropdownDirective } from './CustomDirectives/dropdown.directive';
import { ChangeBgColorDirective } from './CustomDirectives/change-bg-color.directive';

// Pagination
import { NgxPaginationModule } from 'ngx-pagination';
// Ag grid Module
import { AgGridModule } from 'ag-grid-angular';




// import { SearchComponent } from './Components/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    LogoutComponent,
    FilterUsersPipe,
    GalleryComponent,
    AboutComponent,
    AlertDirective,
    AlertComponent,
    AlertDirectiveComponent,
    FilterComponent,
    ImageViewComponent,
    RegisterComponent,
    PagenotfoundComponent,
    AuthenticationComponent,
    SignInsignUpauthComponent,
    PhotosComponent,
    AddPhotosComponent,
    SearchComponent,
    DropdownDirective,
    ChangeBgColorDirective,
  ],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MeterialModule,
    ReactiveFormsModule,
    FormsModule, 
    NgOptimizedImage,
    MatIconModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    AppModulesModule,
    NgxPaginationModule,
    AgGridModule,
  ],
  providers: [UsersService,AlertService,AuthService, {provide: PRECONNECT_CHECK_BLOCKLIST,multi: true, useValue: 'https://your-domain.com'}],
  exports: [AlertDirective,SearchComponent],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    console.log('App Modules Loaded');
    
  }
}

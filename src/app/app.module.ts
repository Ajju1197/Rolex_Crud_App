import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// firebase related modules
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './Components/admin/admin.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'
import { UsersService } from './Services/users.service';
// Toastrmodule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { MeterialModule } from './meterial/meterial.module';
import { UserComponentComponent } from './Components/user-component/user-component.component';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';
import { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Components/Logins/login/login.component';
import { LogoutComponent } from './Components/Logins/logout/logout.component';
import { FilterUsersPipe } from './Pipes/filter-users.pipe';
import { ViewComponent } from './Components/view/view.component';
import { AddComponent } from './Components/add/add.component';
import { EditComponent } from './Components/edit/edit.component';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { AboutComponent } from './Components/about/about.component';
import { PostsModule } from './Components/posts/posts.module';
import { NgOptimizedImage } from '@angular/common';
import { AlertDirective } from './CustomDirectives/alert.directive';
import { AlertComponent } from './CustomDirectives/alert/alert.component';
import { AlertService } from './Services/alert.service';
import { CardHighlightDirective } from './CustomDirectives/card-highlight.directive';
import { MatIconModule } from '@angular/material/icon';
import { AlertDirectiveComponent } from './CustomDirectives/alert-directive/alert-directive.component';
import { FilterComponent } from './Components/filter/filter.component';
import { ImageViewComponent } from './Components/image-view/image-view.component';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './Components/Logins/register/register.component';
import { AuthService } from './Services/auth.service';


// import { SearchComponent } from './Components/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    FooterComponent,
    NavbarComponent,
    UserComponentComponent,
    LoginComponent,
    LogoutComponent,
    FilterUsersPipe,
    ViewComponent,
    AddComponent,
    EditComponent,
    GalleryComponent,
    AboutComponent,
    AlertDirective,
    AlertComponent,
    AlertDirectiveComponent,
    FilterComponent,
    ImageViewComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MeterialModule,
    ReactiveFormsModule,
    FormsModule,
    PostsModule,
    NgOptimizedImage,
    MatIconModule,
  ],
  providers: [UsersService,AlertService,AuthService],
  exports: [AlertDirective,ReactiveFormsModule,FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

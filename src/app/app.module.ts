import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { WrongWayComponent } from './wrong-way/wrong-way.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PostCorrectorComponent } from './post-corrector/post-corrector.component';
import { FavoriesComponent } from './favories/favories.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    HeaderComponent,
    EditPostComponent,
    WrongWayComponent,
    AllPostsComponent,
    NavbarComponent,
    MyProfileComponent,
    PostCorrectorComponent,
    FavoriesComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide :LOCALE_ID, useValue:'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    registerLocaleData(fr.default);
  }
}

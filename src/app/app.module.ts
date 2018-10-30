import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { UserModule } from './user/user.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertService } from './interface/services/alert.service';
import { AdminauthService } from './interface/services/adminauth.service';
import { UserauthService } from './interface/services/userauth.service';
import { AlertComponent } from './alert/alert.component';
import { AdminModule } from './admin/admin.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HelpersModule } from './helpers/helpers.module';



@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    PageNotFoundComponent,
    LoginComponent,
    AlertComponent
 ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserModule,
    AdminModule,
    HelpersModule,
    AppRoutingModule,
    NgxPaginationModule,
    AngularFontAwesomeModule
  ],
    providers: [
    AlertService,
    AdminauthService,
    UserauthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

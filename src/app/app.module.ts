import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AuthProvider } from '../providers/auth/auth';
import { CrudProvider } from '../providers/crud/crud';
import { ListPage } from '../pages/list/list';

import { LaravelPassportModule } from "laravel-passport";
import { HttpModule } from '@angular/http';
import { ProfilePage } from '../pages/profile/profile';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';
import { HTTP } from '@ionic-native/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ListPage,
    ProfilePage,
    UpdateProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    Ng2SearchPipeModule,
    // LaravelPassportModule.forRoot({apiRoot: 'http://127.0.0.1:8000/', 
    //                               clientId: 1, 
    //                               clientSecret:'nmmPNkIaXpEinctTyMGXhLSEahIYA0WegZsOBX85'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ListPage,
    ProfilePage,
    UpdateProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    CrudProvider,
    HTTP
  ]
})
export class AppModule {}

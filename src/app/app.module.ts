import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  IonicApp, IonicModule, IonicErrorHandler
  , ItemSliding
} from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AppVersion } from '@ionic-native/app-version';
import { HttpClientModule } from '@angular/common/http';
//locale
import localeTh from '@angular/common/locales/th';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeTh);
//Plugin-Native
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { SQLite } from '@ionic-native/sqlite';
import { NgCalendarModule } from 'ionic2-calendar';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

//Page
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { LockscreenPage } from '../pages/lockscreen/lockscreen';
import { MyprofilePage } from '../pages/myprofile/myprofile';
import { MenuPage } from '../pages/menu/menu';
import { SetpinPage } from '../pages/setpin/setpin';
import { ConfirmpinPage } from '../pages/confirmpin/confirmpin';
import { ActivityAddPage } from '../pages/activity-add/activity-add';
import { MeetingListPage } from '../pages/meeting-list/meeting-list';
import { LoginSwitchPage } from '../pages/login-switch/login-switch';
//Provider
import { ApiProvider } from '../providers/api/api';
import { UserloginProvider } from '../providers/userlogin/userlogin';
import { CommonProvider } from '../providers/common/common';
import { OmmMeetingListProvider } from '../providers/omm-meeting-list/omm-meeting-list';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    LockscreenPage,
    MyprofilePage,
    MenuPage,
    SetpinPage,
    ConfirmpinPage,
    ActivityAddPage,
    TabsPage,
    MeetingListPage
    , LoginSwitchPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    NgCalendarModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    LockscreenPage,
    TabsPage,
    MyprofilePage,
    SetpinPage,
    ConfirmpinPage,
    ActivityAddPage,
    MenuPage
    , MeetingListPage
    , LoginSwitchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LOCALE_ID, useValue: 'th-TH' },
    ApiProvider,
    Network,
    SQLite,
    AppVersion,
    UserloginProvider,
    CommonProvider,
    OmmMeetingListProvider
    , FingerprintAIO
  ]
})
export class AppModule { }

import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

///providers
import { UserloginProvider } from '../../providers/userlogin/userlogin';

//models
import { UserAccount } from '../../models/UserAccount';

///Pages
import { LockscreenPage } from '../lockscreen/lockscreen';
import { LoginPage } from '../login/login';
import { ConfirmpinPage } from '../confirmpin/confirmpin';

@Component({
  selector: 'page-login-switch',
  templateUrl: 'login-switch.html',
})
export class LoginSwitchPage {

  sUsername: string;
  sPassword: string;
  sPINConfirm: string;
  sPIN: string;
  sPIN1: string;
  sPIN2: string;
  sPIN3: string;
  sPIN4: string;
  sPIN5: string;
  sPIN6: string;
  UserData: UserAccount;
  UserAccountData: UserAccount;
  isLogin: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public toast: ToastController
    , public popup: AlertController
    , public loading: LoadingController
    , public usrProvider: UserloginProvider
    , public platform: Platform
    , public sqlite: SQLite
    , public storage: Storage
    , private faio: FingerprintAIO
  ) {
  }

  ionViewDidLoad() {


    this.usrProvider.isLogged().then((val: boolean) => {
      this.isLogin = val;

      if (this.isLogin) {
        this.usrProvider.getUserAccountFromLocalStorage().then((usr: UserAccount) => {
          this.UserAccountData = usr;
          console.log(this.UserAccountData);
          this.sPIN = '' + this.UserAccountData.sPIN;
          console.log(this.UserAccountData.sUserName + ' ' + this.UserAccountData.sPIN);
        });

      } else {
        this.navCtrl.setRoot(LoginPage);
      }
    });


  }

  Logout() {
    this.storage.set('IsLogined', false);
  }

  ClearLogin() {

    this.storage.ready().then(() => {
      this.storage.get("useraccount").then((value: UserAccount) => {

        //ลบออกจากฐานข้อมูล
        if (this.platform.is('core')) {
          this.sqlite.create({
            name: "data.db", location: "default"
          }).then((db: SQLiteObject) => {
            db.executeSql("DELETE FROM T_LOGIN ", [value.sUserName])
              .then((data) => { }, (error) => { });
          });
        }

        let isRemoved = this.storage.remove('useraccount');
        let isRemoved2 = this.storage.remove('username');
      });

    });
  }

  ShowFingerPrint() {
    this.faio.show({
      clientId: 'FingerPrintScan',
      clientSecret: 'password', // Only Android
      localizedFallbackTitle: 'Use Pin', // Only iOS
      localizedReason: 'Please authenticate' // Only iOS
    })
      .then((result: any) => {
        this.navCtrl.setRoot('HomePage');
      })
      .catch((error: any) => {
        console.log('err: ', error);
      });
  }

  ShowPinCode() {

    console.log('ShowPinCode')
    console.log(this.sPIN)
    console.log(this.UserAccountData)
    this.navCtrl.push(ConfirmpinPage, { UserAccountData: this.UserAccountData, Pin: this.sPIN }, { animate: false });

  }



  //show toast
  presentToast(sMsg) {
    let toast = this.toast.create({
      message: sMsg,
      duration: 3000,
      position: 'buttom'
    });

    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });

    toast.present();
  }
}

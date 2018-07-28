import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

///providers
import { UserloginProvider } from '../../providers/userlogin/userlogin';

//models
import { UserAccount } from '../../models/UserAccount';

///Pages
import { LockscreenPage } from '../lockscreen/lockscreen';

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
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public toast: ToastController
    , public popup: AlertController
    , public loading: LoadingController
    , public usrProvider: UserloginProvider
    , public platform: Platform
    , public sqlite: SQLite
    , public storage: Storage
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginSwitchPage');

    console.log(this.sUsername + ':' + this.sPassword);

    this.usrProvider.login(this.sUsername, this.sPassword).then((res: UserAccount) => {
      this.UserData = res;
      console.log(this.UserData);

      this.storage.ready().then(() => {

        console.log('storage.ready');
        let usr = this.storage.get('username'); // this.storage.get('username', this.UserAccountData.sUserName); 
        this.sPINConfirm = this.storage.get('PIN');
      });
      // set a key/value
    });

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

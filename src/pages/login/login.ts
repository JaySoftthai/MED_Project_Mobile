import { Component, animate } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { SQLite ,SQLiteObject} from '@ionic-native/sqlite';

//import page
import { LockscreenPage } from'../lockscreen/lockscreen';
import { SetpinPage } from '../setpin/setpin';
//import provider
import{ UserloginProvider } from '../../providers/userlogin/userlogin';
//models
import{ UserAccount } from '../../models/UserAccount';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  sUsername:string;
  sUsername1:string;
  sPassword:string;
  myForm: FormGroup;
  txtUsername: FormControl;
  txtPassword: FormControl;
  UserData :UserAccount;
  isLogin:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , private formBdr: FormBuilder
    ,public toast :ToastController
    ,public popup:AlertController
    ,public loading:LoadingController
    ,public usrProvider:UserloginProvider
    ,public platform:Platform
    ,public sqlite :SQLite
    ,public storage:Storage) {
       //ตรวจสอบความถูกต้องของฟอร์ม เช่น required, minLength
    this.txtUsername = this.formBdr.control('', Validators.required);
    this.txtPassword = this.formBdr.control('', Validators.compose([Validators.required, Validators.minLength(8)]));
    this.myForm = this.formBdr.group({ 'txtUsername': this.txtUsername, 'txtPassword': this.txtPassword});
    this.usrProvider.CreateTableLogin();

    this.usrProvider.getUserNameFromStorage().then((res:string)=>{
     this.sUsername1 = res;
    });
    console.log( this.storage.ready());
   // this.storage.ready().then(() => { this.storage.set('username', "1234"); });
    this.storage.get('username').then((name) => {
      console.log('Me: Hey, ' + name + '! You have a very nice name.');
    });
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {

    //เมื่อเข้าหน้า login ให้ตรวจสอบก่อนว่าเคย login แล้วยัง หากเคยให้ไปยังหน้า Lock screen
    this.usrProvider.isLogin().then((res: boolean) => {
      this.isLogin = res;
      console.log('isLogin:' + this.isLogin);
      if (this.isLogin) {
        this.navCtrl.setRoot(LockscreenPage);
        return false;
      }
       else { return false; }
    });
  }
  login(){
    //รับข้อมูลจากฟอร์ม
    let sUsername = this.myForm.controls['txtUsername'].value;
    let sPassword = this.myForm.controls['txtPassword'].value;
    console.log("sUsername "+sUsername);
    console.log("sPassword "+sPassword);
    if(sUsername != "" &&sPassword!="" )
    {
      this.usrProvider.login(sUsername,sPassword).then((res: UserAccount) => {
        this.UserData = res;
        if (res != undefined && res.sResult != null) 
        {
            console.log("res "+ res.sFirstName);
            if(res.sResult=="Success")
            {
              console.log(this.UserData);
              this.navCtrl.push(SetpinPage,{UserAccountData:this.UserData},{animate:false});
            }
            else
            {
              //แจ้งเตือนกรณี login not success
              let alert = this.popup.create({ title: res.sMsg1, buttons: ['ตกลง'] });
              alert.present();
            }
        }
        else{ 
          this.presentToast("No response."); 
        }
      }).catch(error => {
        this.presentToast("Login error.");
      });
    }
    else
    {
      //แจ้งเตือนกรณีไม่กรอก username / password
      let alert = this.popup.create({ title: "Please enter Username and Password", buttons: ['ตกลง'] });
      alert.present();
    }
}
  register(){
       this.navCtrl.push(LockscreenPage, {}, {animate: false});
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

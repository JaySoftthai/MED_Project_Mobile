import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
//import { SQLite ,SQLiteObject} from '@ionic-native/sqlite';

import { SetpinPage } from '../setpin/setpin';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { UserAccount } from '../../models/UserAccount';
@Component({
  selector: 'page-confirmpin',
  templateUrl: 'confirmpin.html',
})
export class ConfirmpinPage {
  UserAccountData:UserAccount;
  sPIN :string;
  sPINConfirm :string;
  sPIN1 :string;
  sPIN2 :string;
  sPIN3 :string;
  sPIN4 :string;
  sPIN5 :string;
  sPIN6 :string;
  isShowBtnBackSpace:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public popup:AlertController
    ,public platform:Platform
    //,public sqlite :SQLite
    ,public storage:Storage
  ) {

    this.platform.ready().then(()=>{
        this.UserAccountData = this.navParams.get("UserAccountData");
        console.log('click:'+ this.UserAccountData);
        this.sPIN = this.navParams.get("Pin");
        console.log('pin:'+ this.sPIN);

        this.sPINConfirm ="";
        this.sPIN1 ="";
        this.sPIN2 ="";
        this.sPIN3 ="";
        this.sPIN4 ="";
        this.sPIN5 ="";
        this.sPIN6 ="";
        this.isShowBtnBackSpace=false;
        this.storage.get('username').then((name) => {
          console.log('Me: Hey, ' + name + '! You have a very nice name.');
          console.log('You: Thanks! I got it for my birthday.');
        });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmpinPage');
  }
  ConfirmPIN():void{
    console.log('sPINConfirm:'+ this.sPINConfirm);
    console.log('sPIN:'+ this.sPIN);
    if(this.sPINConfirm.length == 6 ){
      if(this.sPIN == this.sPINConfirm)
      {
        this.UserAccountData.sPIN = this.sPINConfirm;
        console.log(this.UserAccountData);
        this.storage.ready().then(() => { this.storage.set('useraccount', this.UserAccountData); });
        console.log(this.UserAccountData.sUserName);
        this.storage.ready().then(() => { this.storage.set('username', this.UserAccountData.sUserName); });
         // set a key/value
         this.storage.set('PIN', this.sPINConfirm);
         // go to Home page.
         this.navCtrl.setRoot(TabsPage);
      }
      else{
        //แจ้งเตือนกรณี PIN not equal
        let alert = this.popup.create({ title: "PIN is not match.", buttons: ['ตกลง'] });
        alert.present();
      }
    }
    else
    {
       //แจ้งเตือนกรณี pin length != 6
       let alert = this.popup.create({ title: "PIN 6 Digits.", buttons: ['ตกลง'] });
       alert.present();
    }
  }
  Cancel():void{
    this.navCtrl.push(SetpinPage,{UserAccountData:UserAccount},{animate:false});
  }
  AddNumber(sNumber:string):void
  {
    let nIndex = this.sPINConfirm.length;
    if(nIndex <= 5){
        if(nIndex==0){
          this.sPIN1 = sNumber; 
          this.sPIN2 ="";
          this.sPIN3 ="";
          this.sPIN4 ="";
          this.sPIN5 ="";
          this.sPIN6 ="";
        }
        else if(nIndex==1){
          this.sPIN2 =sNumber;
          this.sPIN3 ="";
          this.sPIN4 ="";
          this.sPIN5 ="";
          this.sPIN6 ="";
        }
        else if(nIndex==2){
          this.sPIN3 =sNumber;
          this.sPIN4 ="";
          this.sPIN5 ="";
          this.sPIN6 ="";
        }
        else if(nIndex==3){
          this.sPIN4 =sNumber;
          this.sPIN5 ="";
          this.sPIN6 ="";
        }
        else if(nIndex==4){
          this.sPIN5 =sNumber;
          this.sPIN6 ="";
        }
        else if(nIndex==5){
          this.sPIN6 =sNumber;
        }
        this.sPINConfirm =  this.sPINConfirm + sNumber;
    }
   else{

   }
   this.isShowBtnBackSpace = (this.sPINConfirm.length>0);
   console.log('isShowBtnBackSpace:'+ this.isShowBtnBackSpace);
   console.log('pin:'+ this.sPINConfirm);
  }

  DelNumber():void{
    let nLength = this.sPINConfirm.length;
    console.log('length:'+ nLength);
    let nIndex = this.sPINConfirm.length-1;
    console.log('index:'+ nIndex);
    if(nLength > 0){
      let sPINOld=this.sPINConfirm;
      this.sPINConfirm = sPINOld.substring(0,nLength-1);
      if(nIndex == 0){
        this.sPIN1 ="";
      }
      else if(nIndex == 1){
        this.sPIN2 ="";
      }
      else if(nIndex == 2){
        this.sPIN3 ="";
      }
      else if(nIndex == 3){
        this.sPIN4 ="";
      }
      else if(nIndex == 4){
        this.sPIN5 ="";
      }
      else if(nIndex == 5){
        this.sPIN6 ="";
      }
    }
    this.isShowBtnBackSpace = (this.sPINConfirm.length>0);
   console.log('isShowBtnBackSpace:'+ this.isShowBtnBackSpace);
    console.log('pin:'+ this.sPINConfirm);
  }


}

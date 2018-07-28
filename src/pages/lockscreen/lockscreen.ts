import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Platform} from 'ionic-angular';

import { HomePage } from '../home/home';
import { UserAccount } from '../../models/UserAccount';

//import Provider
//import { CommonProvider } from '../../providers/common/common';
//import { ApiProvider } from '../../providers/api/api';
import { UserloginProvider } from '../../providers/userlogin/userlogin';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'page-lockscreen',
  templateUrl: 'lockscreen.html',
})
export class LockscreenPage {
  UserAccountData:UserAccount;
  sUsername:string;
  sPIN :string;
  sPIN1 :string;
  sPIN2 :string;
  sPIN3 :string;
  sPIN4 :string;
  sPIN5 :string;
  sPIN6 :string;
  isShowBtnBackSpace:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public storage:Storage
    ,public popup:AlertController
    ,public usrProvider:UserloginProvider
    ,public platform:Platform
  ) {
        this.sPIN ="";
        this.sPIN1 ="";
        this.sPIN2 ="";
        this.sPIN3 ="";
        this.sPIN4 ="";
        this.sPIN5 ="";
        this.sPIN6 ="";
        this.sUsername="";
        this.isShowBtnBackSpace=false;
        this.usrProvider.getUserNameFromStorage().then((res:string)=>{
          console.log(" this.usrProvider.getUserNameFromStorage() res : "+res);
          if(res != null && res != undefined &&res != ""){
             this.sUsername = res;
             console.log(" this.sUsername = res:"+ this.sUsername);
             this.usrProvider.getUserInfoByUserName(this.sUsername).then((res2: UserAccount) => {
                  this.UserAccountData = res2;
                  if (res2 != undefined && res2.sResult=="Success") 
                  {
                    this.storage.ready().then(() => { this.storage.set('useraccount', res2); });
                  }
                  console.log(" res2.sResult : "+ res2.sResult);
                  console.log("this.usrProvider.getUserInfoByUserName res2 : " + res2);
              });
          }
         });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LockscreenPage');
  }
  Submit():void
  {
    if(this.sPIN.length == 6 ){
      let PIN ="";
      this.storage.get('PIN').then((val) => {
        //check pin .
        if(this.sPIN == val){
            console.log("Submit LockScreen:"+ this.UserAccountData);
            // go to Home page.
            this.navCtrl.setRoot(TabsPage);
            //this.navCtrl.push(HomePage,{UserAccountData:this.UserAccountData},{animate:false});
        }
        else
        {
          //Alert when PIN is wrong
          let alert = this.popup.create({ title: "PIN is wrong.", buttons: ['ตกลง'] });
          alert.present();
        }
      });
    }
    else
    {
       //Alert when PIN length != 6
       let alert = this.popup.create({ title: "PIN 6 Digits.", buttons: ['ตกลง'] });
       alert.present();
    }
  }

  AddNumber(sNumber:string):void
  {
    let sBullet="•";
    let nIndex = this.sPIN.length;
    if(nIndex <= 5){
        if(nIndex==0){
          this.sPIN1 = sBullet; 
          this.sPIN2 ="";
          this.sPIN3 ="";
          this.sPIN4 ="";
          this.sPIN5 ="";
          this.sPIN6 ="";
        }
        else if(nIndex==1){
          this.sPIN2 =sBullet;
          this.sPIN3 ="";
          this.sPIN4 ="";
          this.sPIN5 ="";
          this.sPIN6 ="";
        }
        else if(nIndex==2){
          this.sPIN3 =sBullet;
          this.sPIN4 ="";
          this.sPIN5 ="";
          this.sPIN6 ="";
        }
        else if(nIndex==3){
          this.sPIN4 =sBullet;
          this.sPIN5 ="";
          this.sPIN6 ="";
        }
        else if(nIndex==4){
          this.sPIN5 =sBullet;
          this.sPIN6 ="";
        }
        else if(nIndex==5){
          this.sPIN6 =sBullet;
        }
        this.sPIN =  this.sPIN + sNumber;
    }
   else{

   }
   this.isShowBtnBackSpace = (this.sPIN.length>0);
   console.log('isShowBtnBackSpace:'+ this.isShowBtnBackSpace);
   console.log('pin:'+ this.sPIN);
  }

  DelNumber():void{
    let nLength = this.sPIN.length;
    console.log('length:'+ nLength);
    let nIndex = this.sPIN.length-1;
    console.log('index:'+ nIndex);
    if(nLength > 0){
      let sPINOld=this.sPIN;
      this.sPIN = sPINOld.substring(0,nLength-1);
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
    console.log('pin:'+ this.sPIN);
    this.isShowBtnBackSpace = (this.sPIN.length>0);
    console.log('isShowBtnBackSpace:'+ this.isShowBtnBackSpace);
  }
}

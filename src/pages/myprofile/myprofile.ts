import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//import Page
import { LoginPage } from '../login/login';
//import Model
import { UserAccount } from '../../models/UserAccount';
//import Provider
import { CommonProvider } from '../../providers/common/common';
import { ApiProvider } from '../../providers/api/api';
import { UserloginProvider } from '../../providers/userlogin/userlogin';
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})
export class MyprofilePage {
  UserData :UserAccount;
  sImageURL:string;
  sUsername:string; 
  sFullName:String;
  sEmail:string;
  sTel:string;
  sClassNo:string;
  constructor(public navCtrl: NavController, public navParams: NavParams
  ,public usrProvider:UserloginProvider
  ,public commonProvider:CommonProvider
  ,public storage:Storage)
   {
     this.sImageURL="assets/imgs/master/student/student-1.jpg";
    //  this.usrProvider.getUserNameFromStorage().then((res:string)=>{
    //   console.log(" this.usrProvider.getUserNameFromStorage() res : "+res);
    //   if(res != null && res != undefined &&res != ""){
    //      this.sUsername = res;
    //      console.log(" this.sUsername = res:"+ this.sUsername);
    //      this.usrProvider.getUserInfoByUserName(this.sUsername).then((res2: UserAccount) => {
    //           this.UserAccountData = res2;
    //           if (res2 != undefined && res2.sResult=="Success") 
    //           {
    //             this.storage.ready().then(() => { this.storage.set('useraccount', res2); });
    //           }
    //           console.log(" res2.sResult : "+ res2.sResult);
    //           console.log("this.usrProvider.getUserInfoByUserName res2 : " + res2);
    //       });
    //   }
    //  });
    //  console.log(" this.UserAccountData "+ this.UserAccountData)

    this.usrProvider.getUserNameFromStorage().then((res:string)=>{
      console.log(" this.usrProvider.getUserNameFromStorage() res : "+res);
      if(res != null && res != undefined &&res != ""){
         this.sUsername = res;
         console.log(" this.sUsername = res:"+ this.sUsername);
         this.usrProvider.getUserInfoByUserName(this.sUsername).then((res2: UserAccount) => {
              this.UserData = res2;
              this.sFullName =this.UserData.sFullName;
              this.sClassNo =this.UserData.sClassNo;
              this.sEmail=this.UserData.sEmail;
              this.sTel=this.UserData.sTel;
              if (res2 != undefined && res2.sResult=="Success") 
              {
                this.storage.ready().then(() => { this.storage.set('useraccount', res2); });
              }
              console.log(" res2.sResult : "+ res2.sResult);
              console.log("this.usrProvider.getUserInfoByUserName res2 : " + this.UserData.sFullName);
              console.log("sFullName : " + this.UserData.sFullName);
              console.log( this.UserData);
          });
      }
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyprofilePage');
  }
  SetData(){

  }
  Logout(){

  }

}

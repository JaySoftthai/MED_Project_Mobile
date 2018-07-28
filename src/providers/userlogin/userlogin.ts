import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise'

import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

//import provider
import { ApiProvider } from '../api/api';

//import models
import { UserAccount } from '../../models/UserAccount';

@Injectable()
export class UserloginProvider {

  constructor(public http: Http, public apiProvider: ApiProvider
    , public platform: Platform
    , public sqlite: SQLite
    , public storage: Storage) {

  }
  //get info data
  getUserInfoByUserName(sUserName: string): Promise<any> {
    console.log("getUserInfoByUserName :" + sUserName)
    let sApiFileName = 'std_login.ashx?mode=get_info_by_user_name&username=' + sUserName + '';
    return new Promise((resolve, reject) => {
      this.apiProvider.getApiEndpoint(sApiFileName).subscribe(res => {
        let useraccount: UserAccount;
        if (res != undefined && res.sUserName != null) {
          useraccount = res;
          console.log("getUserInfoByUserName res :" + res)
        }
        else {
          useraccount.sResult = "Failed";
        }
        resolve(useraccount);
      }, (error) => reject(false))
    });
  }
  //check username and password
  chkLogin(sUserName: string, sPassword: string): Observable<UserAccount> {
    let sApiFileName = 'std_login.ashx?mode=login&username=' + sUserName + '&password=' + sPassword + '';
    return this.apiProvider.getApiEndpoint(sApiFileName);
  }
  getUserNameFromStorage(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        this.storage.get("username").then((value: UserAccount) => resolve(value), (reason) => reject(false));
      });
    });
  }

  getUserAccountFromStorage(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        this.storage.get("username").then((value: string) => resolve(value), (reason) => reject("false"));
      });
    });
  }
  //Login
  login(sUserName: string, sPassword: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.chkLogin(sUserName, sPassword).subscribe(res => {
        let useraccount: UserAccount;
        let isSuccess = res != undefined && res.sResult != null;
        console.log("prv  " + res.sResult);
        if (isSuccess) {
          useraccount = res;
        }
        else {
          useraccount.sResult = "Failed";
          useraccount.sMsg1 = "Login not success.";
        }
        resolve(useraccount);
      }, (error) => reject(false));

    });
  }
  //create table login local
  CreateTableLogin(): void {
    if (this.platform.is('core')) {
      // ถ้า platform พร้อมใช้งาน
      this.platform.ready().then(() => {
        // สร้างฐานข้อมูลชื่อว่า data.db
        this.sqlite.create({
          name: "data.db", location: "default"
        })
          .then((db: SQLiteObject) => {
            //หากยังไม่มีตาราง login ก็ให้สร้างตารางใหม่ หากมีแล้วก็ไม่ต้องสร้าง
            db.executeSql("CREATE TABLE IF NOT EXIST T_LOGIN (id INTEGER PRIMAY KEY AUTOINCREMENT, sUsername VARCHAR(20) ,sUserCode VARCHAR(11) ,sPin VARCHAR(6))", {})
              .then((data) => { }, (error) => { });
          }, (error) => { });
      });
    }
  }
  isLogin(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        this.storage.get("username").then((value: string) => resolve(value != undefined && value != null), (reason) => reject(false));
      });
    });
    //  return new Promise((resolve, reject) => {
    //     let sUsername = this.getUserNameFromStorage();
    //     resolve(sUsername);
    //   });
  }
}

// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Network } from '@ionic-native/network';
import { isNumber } from 'ionic-angular/util/util';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class ApiProvider {
  apiUrl: string;
  constructor(public http: Http) {
    this.apiUrl = "http://www.softthai.com/Med_ams/Mobile/Ashx/";
  }
  //get api url
  getApiUrl(): string { return this.apiUrl; }

  //method handleError เป็น method สำหรับดักจับข้อผิดพลาดที่ส่งมาจาก Backend
  // error.json().errorMessage คำสั่ง .errorMessage เป็น name ของ json ในส่วนของ Backend ขึ้นกับว่าตั้งอะไรไว้
  //หากไม่มี error ส่งมาจาก Backend จะใช้ข้อความ 'เกิดข้อผิดพลาดจาก Server' แทน
  private handleError(error: any) {
    return Observable.throw(error.json().errorMessage || 'เกิดข้อผิดพลาดจาก Server');
  }

  //ดึงข้อมูลจาก Backend ด้วย method get() ตาม URL ที่ระบุไว้
  //คำสั่ง .map() ให้พิมพ์ติดกันกับ .get() ก่อนค่อย enter ลงมาได้
  //<any[]> res.json() แปลง json จากฝั่ง backend ให้กับโมเดล คลาส any
  getApiEndpoint(sApiFileName: string): Observable<any> {
    return this.http.get(this.apiUrl + sApiFileName)
      .map((res: Response) => <any>res.json())
      .catch(this.handleError);
  }
  //ดึงข้อมูลจาก Backend ด้วย method get() ตาม URL ที่ระบุไว้ พร้อม return object
  getApiEndpointWithObject(sApiFileName: string, sJsArrObject: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + sApiFileName, sJsArrObject)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}

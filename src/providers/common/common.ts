import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {
  apiUrl: string;
  sPathUploadFile:string;
  sURLUploadFile:string;
  constructor(public http: HttpClient) {
    console.log('Hello CommonProvider Provider');
    this.apiUrl = "http://www.softthai.com/Med_ams/Mobile/Ashx/";
    this.sURLUploadFile = "http://www.softthai.com/Med_ams/UploadFiles/";
    this.sPathUploadFile = "/UploadFiles/";
  }
  GetMonthFullNameTH(sMonthNo):String{
    let sMonthName ="";
      switch(sMonthNo){
        case "1" : sMonthName ="มกราคม"; break;
        case "2" : sMonthName ="กุมภาพันธ์"; break;
        case "3" : sMonthName ="มีนาคม"; break;
        case "4" : sMonthName ="เมษายน"; break;
        case "5" : sMonthName ="พฤษภาคม"; break;
        case "6" : sMonthName ="มิถุนายน"; break;
        case "7" : sMonthName ="กรกฎาคม"; break;
        case "8" : sMonthName ="สิงหาคม"; break;
        case "9" : sMonthName ="กันยายน"; break;
        case "10" : sMonthName ="ตุลาคม"; break;
        case "11" : sMonthName ="พฤศจิกายน"; break;
        case "12" : sMonthName ="ธันวาคม"; break;
      }

    return sMonthName;
  }
  GetMonthShortNameTH(sMonthNo):String{
    let sMonthName ="";
      switch(sMonthNo){
        case "1" : sMonthName ="ม.ค."; break;
        case "2" : sMonthName ="ก.พ."; break;
        case "3" : sMonthName ="มี.ค."; break;
        case "4" : sMonthName ="เม.ย"; break;
        case "5" : sMonthName ="พ.ค."; break;
        case "6" : sMonthName ="มิ.ย."; break;
        case "7" : sMonthName ="ก.ค."; break;
        case "8" : sMonthName ="ส.ค."; break;
        case "9" : sMonthName ="ก.ย."; break;
        case "10" : sMonthName ="ต.ค."; break;
        case "11" : sMonthName ="พ.ย."; break;
        case "12" : sMonthName ="ธ.ค."; break;
      }
    return sMonthName;
  }
}

import { Component } from '@angular/core';
import { NavController,NavParams, ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import * as moment from 'moment';
import 'moment/locale/th';
//import page
import { TabsPage } from '../tabs/tabs';
import { ActivityAddPage} from '../activity-add/activity-add';
// import {EventModalAddPage} from '../event-modal-add/event-modal-add';
//import Model
import { UserAccount } from '../../models/UserAccount';
import { Schedule } from '../../models/Schedule';
//import provider
import { CommonProvider } from '../../providers/common/common';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  UserAccountData:UserAccount;
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  calendar = {
    mode: 'week',
    locale: 'th-TH',
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function(date:Date) {
          return date.getDate().toString();
      },
      formatMonthViewDayHeader: function(date:Date) {
          return 'testMDH';
      },
      formatMonthViewTitle: function(date:Date) {
       
          return 'testMT';
      },
      formatWeekViewDayHeader: function(date:Date) {
        console.log(date);
          return moment(date).locale("th").format('dd')+" "+moment(date).locale("th").format('Do');
      },
      formatWeekViewTitle: function(date:Date) {
          return  moment(date).locale("th").format('MMMM YYYY');
      },
      //Week hour
      formatWeekViewHourColumn: function(date:Date) {
          return date.getHours().toString() +".00";
      },
      formatDayViewHourColumn: function(date:Date) {
          return 'testDH';
      },
      formatDayViewTitle: function(date:Date) {
          return 'testDT';
      }
  },
  };
  
  event = { 
    title:String,
    startTime: new Date(), 
    endTime: new Date(),
     allDay: false,
     sClassCode:String,
     sClassName:String ,
     sTeacherName:String,
     sType:String,
     };
     markDisabled = (date: Date) => {
      var current = new Date();
      return date < current;
  };
  constructor(public navCtrl: NavController,public navParams:NavParams
  ,public platform:Platform
  ,public storage:Storage
  , private modalCtrl: ModalController
  , private alertCtrl: AlertController) {
    let colors: string[] = ['primary', 'secondary', 'danger', 'success'];
    this.eventSource.push({
      title: 'AR001',
      startTime: new Date("2018-06-12T08:00:00+07:00"),
      endTime: new Date("2018-06-12T11:00:00+07:00"),
      allDay: false,
      sClassCode:"AR001",
      sClassName:"อายุรศาสตร์ 1",
      sTeacherName:"ดร.อัครานุรักษ์กุล ปริญญา",
      sType:"S",
  });
  this.eventSource.push({
    title: 'AR001',
    startTime: new Date("2018-06-12T08:00:00+07:00"),
    endTime: new Date("2018-06-12T11:00:00+07:00"),
    allDay: false,
    sClassCode:"AR001",
    sClassName:"อายุรศาสตร์ 1",
    sTeacherName:"ดร.อัครานุรักษ์กุล ปริญญา",
    sType:"S",
});
  this.eventSource.push({
      title: 'KW001',
      startTime: new Date("2018-06-12T13:00:00+07:00"),
      endTime: new Date("2018-06-12T15:00:00+07:00"),
      allDay: false,
      sClassCode:"KW001",
      sClassName:"กายวิภาคศาสตร์ 1",
      sTeacherName:"ศ.วิชิต วิริยะโรจน์",
      sType:"S",
  });
  this.eventSource.push({
    title: 'PS001',
    startTime: new Date("2018-06-13T13:00:00+07:00"),
    endTime: new Date("2018-06-13T16:00:00+07:00"),
    allDay: false,
    sClassCode:"PS001",
    sClassName:"เภสัชวิทยา 1",
    sTeacherName:"ดร.นิรันดร์ หุ่นฉายศรี",
    sType:"S",
});
this.eventSource.push({
  title: 'KM001',
  startTime: new Date("2018-06-14T13:00:00+07:00"),
  endTime: new Date("2018-06-14T16:00:00+07:00"),
  allDay: false,
  sClassCode:"KM001",
  sClassName:"กุมารเวชศาสตร์ 1",
  sTeacherName:"ดร.นิรันดร์ หุ่นฉายศรี",
  sType:"S",
});
this.eventSource.push({
  title: 'KM001',
  startTime: new Date("2018-06-14T09:00:00+07:00"),
  endTime: new Date("2018-06-14T12:00:00+07:00"),
  allDay: false,
  sClassCode:"KM001",
  sClassName:"กุมารเวชศาสตร์ 1",
  sTeacherName:"ดร.นิรันดร์ หุ่นฉายศรี",
  sType:"S",
});
this.eventSource.push({
  title: 'Sport Day',
  startTime: new Date("2018-06-15T09:00:00+07:00"),
  endTime: new Date("2018-06-15T12:00:00+07:00"),
  allDay: true,
  sClassCode:"Sport Day",
  sClassName:"Sport Day 2018",
  sTeacherName:"",
  sType:"A",
});
  }
 
  addEvent() {
    let modal = this.modalCtrl.create(ActivityAddPage, {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      console.log("data:"); console.log(data);
      if (data) {
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        console.log("events" );
        console.log(events);
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    let timeStart = moment(event.startTime).format('HH:mm น.');
    let timeEnd = moment(event.endTime).format('HH:mm น.');

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: event.sClassName,
      message:'' + timeStart + ' - ' + timeEnd+'<br>'+event.sTeacherName+'',
      buttons: ['OK']
    })
    alert.present();
  }
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
}

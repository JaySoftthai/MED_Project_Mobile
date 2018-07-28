import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

@Component({
  selector: 'page-event-modal-add',
  templateUrl: 'event-modal-add.html',
})
export class EventModalAddPage {

  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
  minDate = new Date().toISOString();
 
  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    console.log("preselectedDate"+preselectedDate);
  }
 
  cancel() {
    this.viewCtrl.dismiss();
  }
 
  save() {
    console.log(this.event);
    console.log(this.event.startTime);
    console.log(this.event.endTime);
    this.viewCtrl.dismiss(this.event);
  }

}

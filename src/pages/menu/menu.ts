import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Import Pages
import { MeetingListPage } from '../meeting-list/meeting-list';
import { FingerPrintPage } from '../finger-print/finger-print';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  GotoPage(mode) {

    this.navCtrl.push(MeetingListPage);

  }
  GotoFingerPrintPage() {

    this.navCtrl.push(FingerPrintPage);

  }
}

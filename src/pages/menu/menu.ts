import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
//Import Pages
import { MeetingListPage } from '../meeting-list/meeting-list';
import { FingerPrintPage } from '../finger-print/finger-print';
import { HomePage } from '../home/home';
import { MyprofilePage } from '../myprofile/myprofile';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  QR_DATA: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private qr_Scanner: QRScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  GotoPage(mode) {
    switch (mode) {
      case "SCHEDULE":
        this.navCtrl.setRoot(HomePage);
        break;
      case "OMM":
        this.navCtrl.setRoot(MeetingListPage);
        break;
      case "HOME":
        this.navCtrl.push(MyprofilePage);
        break;
      case "LOGBOOK":
        //web softthai
        // this.navCtrl.push(MeetingListPage);
        break;
      case "ASSESSMENT":
        // this.navCtrl.push(MeetingListPage);
        break;
      case "QR":
        // this.navCtrl.push(MeetingListPage);
        break;

      default:
        break;
    }
  }
  GotoFingerPrintPage() {

    this.navCtrl.push(FingerPrintPage);

  }
  CallQRScaner() {
    // Optionally request the permission early
    this.qr_Scanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qr_Scanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.QR_DATA = text;
            this.qr_Scanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => { console.log('Error is', e) });

  }
}

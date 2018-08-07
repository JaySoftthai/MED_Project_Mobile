import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Camera } from '@ionic-native/camera';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

///providers
import { ApiProvider } from '../../providers/api/api';
import { UserloginProvider } from '../../providers/userlogin/userlogin';
//models
import { UserAccount } from '../../models/UserAccount';

//Import Pages
import { MeetingListPage } from '../meeting-list/meeting-list';
import { FingerPrintPage } from '../finger-print/finger-print';
import { HomePage } from '../home/home';
import { MyprofilePage } from '../myprofile/myprofile';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  QR_DATA: string;
  UserAccountData: UserAccount;
  isLogin: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public toast: ToastController
    , public popup: AlertController
    , public loading: LoadingController
    , public platform: Platform
    , public api: ApiProvider
    , public usrProvider: UserloginProvider
    , private qr_Scanner: QRScanner
    , private iBrowser: InAppBrowser
    , private barcodeScanner: BarcodeScanner
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    this.usrProvider.isLogged().then((val: boolean) => {
      this.isLogin = val;

      if (this.isLogin) {
        this.usrProvider.getUserAccountFromLocalStorage().then((usr: UserAccount) => {
          this.UserAccountData = usr;
        });

      }
    });
  }
  GotoPage(mode) {
    switch (mode) {
      case "SCHEDULE":
        this.navCtrl.push(TabsPage);
        break;
      case "OMM":
        this.navCtrl.push(MeetingListPage);
        break;
      case "HOME":
        this.navCtrl.push(MyprofilePage);
        break;
      case "LOGBOOK":
        //web softthai
        ///LogBook_Bypass.aspx?str=sUserCode&L 
        this.openUrl(this.api.getLOG_Url() + 'LogBook_Bypass.aspx?str=' + this.UserAccountData.sUserID + '_L', '_blank');
        // this.navCtrl.push(MeetingListPage);
        break;
      case "ASSESSMENT":
        ///LogBook_Bypass.aspx?str=sUserCode&A
        this.openUrl(this.api.getASS_Url() + 'LogBook_Bypass.aspx?str=' + this.UserAccountData.sUserID + '_A', '_blank');
        // this.navCtrl.push(MeetingListPage);
        break;
      case "QR":
        // this.navCtrl.push(MeetingListPage);
        break;

      default:
        break;
    }
  }
  openUrl(_url, _target) {

    this.platform.ready().then(() => {
      let browser = new InAppBrowser();
      browser.create(_url, _target, 'clearsessioncache=yes,clearcache=yes');

    });
  }
  GotoFingerPrintPage() {

    this.navCtrl.push(FingerPrintPage);

  }
  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  CallScaner() {


    this.barcodeScanner.scan({
      preferFrontCamera: false
      , showFlipCameraButton: false
      , showTorchButton: false
      , torchOn: false
      , disableAnimations: false
      , disableSuccessBeep: false
      // , prompt: "Do you want to next?"
      // , orientation: "portrait" 1000
      , resultDisplayDuration: 0
    }).then(barcodeData => {

      this.QR_DATA = barcodeData.text;
      if (barcodeData.text != "") { 

        
      }
    });
  }
  CallQRScaner() {
    this.qr_Scanner.show().then((stat: QRScannerStatus) => {
      this.presentToastCtrl(stat.authorized, 6000, 'top');
    });

    // this.showCamera();
    let scanSub = this.qr_Scanner.scan().subscribe((text: string) => {
      console.log('Scanned something', text);
      this.presentToastCtrl(text, 6000, 'top');

      this.QR_DATA = text;
      this.qr_Scanner.hide(); // hide camera preview
      scanSub.unsubscribe(); // stop scanning
    });
    // this.qr_Scanner.openSettings();



    // // Optionally request the permission early

    // this.qr_Scanner.prepare()
    //   .then((status: QRScannerStatus) => {
    //     this.presentToastCtrl(status.authorized, 6000, 'buttom');
    //     if (status.authorized) {
    //       // camera permission was granted


    //       // start scanning
    //       let scanSub = this.qr_Scanner.scan().subscribe((text: string) => {
    //         console.log('Scanned something', text);
    //         this.presentToastCtrl(text, 6000, 'top');

    //         this.QR_DATA = text;
    //         this.qr_Scanner.hide(); // hide camera preview
    //         scanSub.unsubscribe(); // stop scanning
    //       });

    //     } else if (status.denied) {
    //       // camera permission was permanently denied
    //       // you must use QRScanner.openSettings() method to guide the user to the settings page
    //       // then they can grant the permission from there
    //     } else {
    //       // permission was denied, but not permanently. You can ask for permission again at a later time.
    //     }
    //   })
    //   .catch((e: any) => {
    //     this.presentToastCtrl('Error is:' + e, 6000, 'buttom');
    //     console.log('Error is ', e)
    //   });

  }

  presentToastCtrl(sMsg, nDuration, sPosition) {
    let toast = this.toast.create({
      message: sMsg,
      duration: nDuration,
      position: sPosition
    });

    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });

    toast.present();
  }



}

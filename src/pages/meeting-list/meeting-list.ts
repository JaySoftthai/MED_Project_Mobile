import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
////import models
import { MeettingData } from '../../models/MeettingData';
////import providers
import { OmmMeetingListProvider } from '../../providers/omm-meeting-list/omm-meeting-list';



@Component({
  selector: 'page-meeting-list',
  templateUrl: 'meeting-list.html',
})
export class MeetingListPage {
  //Declare param
  nTotalRows: number = 0;//amout all row in db
  nStart: number = 0;//amout Start row display
  nTop: number = 20;//amout Start row display 
  lstMeeting: MeettingData[];
  sub: Subscription;
  sKeyword: string;
  sSearch_ReqDate: string;
  sSearch_CounterService: string;
  sSearch_TrackingNumber: string;
  sSearch_Status: string;
  sUserID: string;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public slidingItem: ItemSliding
    , private MeetingProv: OmmMeetingListProvider
  ) { }
  ionViewDidLoad() {
    console.log('meetingpage ionViewDidLoad')
    this.BindMeeting();
  }
  BindMeeting(isScroll?: boolean) {
    // let _UserID = (this.usrdata == null) ? '' : this.usrdata.userid;
    // let _RoleID = (this.usrdata == null) ? '' : this.usrdata.role;
    this.sub = this.MeetingProv.getData_Metting('meetting_list', this.sKeyword, [this.sSearch_ReqDate, this.sSearch_CounterService, this.sSearch_TrackingNumber, this.sSearch_Status], this.nStart, this.nTop).subscribe(
      (res) => {

        if (isScroll && this.lstMeeting.length > 0)
          this.lstMeeting = this.lstMeeting.concat(res);
        else
          this.lstMeeting = res;

        console.log(this.lstMeeting)
        this.nStart = this.lstMeeting.length;
        this.nTotalRows = this.lstMeeting.length;
      },
      (error) => { this.errorMessage = <any>error }
    );

  }

  doInfinite(infiniteScroll) {

    this.nStart = this.nStart + this.nTop;

    return new Promise((resolve) => {

      setTimeout(() => {
        this.BindMeeting(true);
        resolve();
      }, 500);
    });
  }

  Accept(slidingItem: ItemSliding) {
    slidingItem.close();
  }
  Decline(slidingItem: ItemSliding) {
    slidingItem.close();
  }
  share(slidingItem: ItemSliding) {
    slidingItem.close();
  }
}

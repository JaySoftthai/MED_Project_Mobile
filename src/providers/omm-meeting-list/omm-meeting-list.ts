import { Injectable } from '@angular/core';
import { Http } from '@angular/http';// import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise'
//import provider
import { ApiProvider } from '../api/api';
//import models
import { MeettingData } from '../../models/MeettingData';

@Injectable()
export class OmmMeetingListProvider {

  constructor(public http: Http, public apiProvider: ApiProvider) {
  }

  getData_Metting(sDataType, sKeyword, jsData, nStartRow, nTopRow): Observable<MeettingData[]> {
    //meetting_list
    let sFile_Handler = 'MeettingData.ashx?sMode=' + sDataType + '&nStart=' + nStartRow + '&nTopRow=' + nTopRow + '&sKeyword=' + sKeyword;
    return this.apiProvider.getApiEndpoint(sFile_Handler);
  }
}

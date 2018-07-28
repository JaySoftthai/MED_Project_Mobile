import { Component } from '@angular/core';
//import page
import { HomePage } from '../home/home';
import { MyprofilePage } from '../myprofile/myprofile';
import { MenuPage } from '../menu/menu';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MenuPage;
  tab3Root = MyprofilePage; 

  constructor() {

  }
}

import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { MainService } from './main.service';
import { AuthService } from './auth.service';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    public mains: MainService,
    public auth : AuthService,
  ) {
    this.initializeApp();
  }
  username = localStorage.getItem("current_user");
  initializeApp() {
    if(localStorage.getItem("current_user") == null){
      this.router.navigate(['/login']);
    } else {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.router.navigate(['/home']);
      });
    }
  }

  public sideMenu = [
    {title: 'Riwayat', url:'/riwayat',icon:'documents'},
    {title: 'Laporan', url:'/laporan',icon:'newspaper'},
    {title: 'List Kebutuhan', url:'/listKebutuhan',icon:'shapes'},
  ];
  show(){
    return !(this.router.url === '/login' || this.router.url === '/registernewfamily' || this.router.url === '/registertofamily');
  }
  logout(){
    localStorage.removeItem("current_user");
    localStorage.removeItem("idUser");
    localStorage.removeItem("idFam");
    window.location.reload();
  }
}

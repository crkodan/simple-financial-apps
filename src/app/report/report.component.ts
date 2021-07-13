import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { MainService } from '../main.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
// import { of } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import * as Chart from 'chart.js';
import { IonRouterOutlet, MenuController, ModalController } from '@ionic/angular';
import {MatTreeModule} from '@angular/material/tree';
import { mainService } from '../helpers/donutChartOptions';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import { sum } from 'lodash';
import { FinanceliteracyModalComponent } from '../financeliteracy-modal/financeliteracy-modal.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})

export class ReportComponent implements OnInit {

  username = localStorage.getItem("current_user");
  doughnutChart: any;
  users=[];
  data:[];
  pengeluarans:number;
  pendapatan=[];
  pendapatans: number;
  cicilan :number;
  pokok:number;
  tersier:number;
  tabungan : number;
  kesehatan : boolean;
  persenCicilan: number;
  Kebutuhan: number;
  persenKebutuhan: number;
  persentabungan: number;
  message:string;
  ktrngn=[];
  detail=[];
  keteranganPengeluaran=[];
  message2: string;
  message3: string;
  simulTabungan: number;
  simulKebutuhan: number;
  simulCicilan: number;
  simulCadangan: number;
  simulInvestasi: number;
  simulProteksi: number;
  showMe:boolean = true;
  tingkatan:string;
  tingkats:string;
  cadangan:number;
  proteksi:number;
  investasi:number;
  kesehatans:boolean;
  keuangan:number;
  totalKebutuhan:number;
  constructor(public main:MainService, private router:Router, private activeRoute:ActivatedRoute,  private modalCtrl: ModalController, public menuCtrl : MenuController, private routerOutlet: IonRouterOutlet) { 
    this.activeRoute.queryParams.subscribe(params =>{
      console.log('params : ', params);
      if(this.router.getCurrentNavigation().extras.state){
        this.kesehatan = this.router.getCurrentNavigation().extras.state.data[0];
        this.pendapatans = this.router.getCurrentNavigation().extras.state.data[1];
        this.pengeluarans = this.router.getCurrentNavigation().extras.state.data[2];
        this.cicilan = this.router.getCurrentNavigation().extras.state.data[3];
        this.Kebutuhan = this.router.getCurrentNavigation().extras.state.data[4];
        this.tabungan = this.router.getCurrentNavigation().extras.state.data[5];
        this.keteranganPengeluaran = this.router.getCurrentNavigation().extras.state.data[6];
        this.proteksi = this.router.getCurrentNavigation().extras.state.data[7];
        this.cadangan = this.router.getCurrentNavigation().extras.state.data[8];
        this.investasi = this.router.getCurrentNavigation().extras.state.data[9];
        this.keuangan = this.router.getCurrentNavigation().extras.state.data[10];
      }
    })
  }
  toogleTag(i){
    this.ktrngn[i].open = !this.ktrngn[i].open;
  }
  toggleItem(i,j){
    this.ktrngn[i].children[j].open = !this.ktrngn[i].children[j].open;
  }
  showDetail(value:string):void{
    this.main.getDetailKeterangan(this.username,value).subscribe(
      (data)=>{
        this.detail = data;
      }
    )
  }
  async openmodal(){
    const modal = await this.modalCtrl.create({
      component : FinanceliteracyModalComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    await modal.present();
  }

  ngOnInit() {
    if(localStorage.getItem("current_user")==null){
      this.router.navigate(['/login']);
    }else{
      this.main.getBulanan(this.username).subscribe((data)=>{
        this.pendapatans = data[0]['besar'];
      });
      this.main.getKeterangan(this.username).subscribe((data)=>{
        this.ktrngn = data;
      });
      this.persenCicilan = (this.cicilan / this.pendapatans) * 100;     
      this.totalKebutuhan = (1*this.keuangan) + (1*this.Kebutuhan);
      if(this.kesehatan == false){
        if(this.persenCicilan >= 30){  
          this.message = "Waspada! Keuangan anda sangat tidak stabil!";
          this.simulCicilan = this.pendapatans * 0.3;
          this.simulKebutuhan = this.pendapatans * 0.5;
          this.simulTabungan = this.pendapatans * 0.03;
          this.simulProteksi = this.pendapatans * 0.03;
          this.simulInvestasi = this.pendapatans * 0.03;
          this.simulCadangan = this.pendapatans * 0.05;
        } 
      } else if(this.kesehatan == true) {
        if(this.persenCicilan != 0  && this.persenCicilan <= 30){
          this.message = "Pertahankan! Keuangan anda sudah cukup stabil!";
          this.simulCicilan = this.pendapatans * 0.3;
          this.simulKebutuhan = this.pendapatans * 0.5;
          this.simulTabungan = this.pendapatans * 0.05;
          this.simulProteksi = this.pendapatans * 0.05;
          this.simulInvestasi = this.pendapatans * 0.05;
          this.simulCadangan = this.pendapatans * 0.05;
        } else if (this.persenCicilan == 0){
          this.message = "Pertahankan! Keuangan anda sangat stabil!";
          this.simulCicilan = this.pendapatans * 0.3;
          this.simulKebutuhan = this.pendapatans * 0.6;
          this.simulTabungan = this.pendapatans * 0.1;
          this.simulProteksi = this.pendapatans * 0.1;
          this.simulInvestasi = this.pendapatans * 0.1;
          this.simulCadangan = this.pendapatans * 0.1;
        }        
      }
      this.showChart();
      console.log(this.simulKebutuhan)
      console.log(this.Kebutuhan)
    }
  }
  showChart(){
    var canvas = document.getElementById('chartss') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    var chart = new Chart(ctx, {
      type: 'horizontalBar',
      // The data for our dataset
      data: {
        labels: ['Cicilan', 'Kebutuhan', 'Tabungan', 'Proteksi', 'Investasi', 'Cadangan'],
        datasets: 
        [{ 
            label : 'Pengeluaran ideal',
            data: [this.simulCicilan, this.simulKebutuhan, this.simulTabungan,this.simulProteksi, this.simulInvestasi, this.simulCadangan, ],
            backgroundColor: [
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)'
            ],
            borderColor: [
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)'
            ],
            borderWidth: 3
        },{
          label:'Pengeluaran realita',
          data:[this.cicilan,this.Kebutuhan,this.tabungan, this.proteksi, this.investasi,this.cadangan ],
          type:'horizontalBar',
          backgroundColor:[
            'rgba(255,204,0, 0.5)',
            'rgba(255,204,0, 0.5)',
            'rgba(255,204,0, 0.5)',
            'rgba(255,204,0, 0.5)',
            'rgba(255,204,0, 0.5)',
            'rgba(255,204,0, 0.5)'
          ],
          borderColor:[
            'rgba(255,204,0, 0.5)',
            'rgba(255,204,0, 0.5)',
            'rgba(255,204,0, 0.5)',
            'rgba(255,204,0, 0.5)',
            'rgba(255,204,0, 0.5)',
            'rgba(255,204,0, 0.5)'
          ],
          borderWidth:3
        }]
      },
      // Configuration options go here
      options: {
        responsive: true,
        maintainAspectRatio: true,        
        legend:{
          position : 'bottom'
        },
        plugins: {
          labels: {
            render: 'label',
            fontColor: ['green', 'white', 'red'],
            precision: 2
          }
        },
      }
    });
  }

}

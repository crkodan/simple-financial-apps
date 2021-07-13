import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { MainService } from '../main.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
// import { Chart } from 'angular-highcharts';
import { Options } from "highcharts";
import { Chart } from 'chart.js';
// import { NavController } from 'ionic-angular';
import { donutChartOptions } from '../helpers/donutChartOptions';
import { PercentPipe } from '@angular/common';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { sum } from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  totalSisaKebutuhan: number;

  constructor(public main:MainService, private router:Router, private activeRoute:ActivatedRoute) {
    // this.chartLabels = ChartDataLabels;
   }
  // donutChart = new Chart(donutChartOptions);
  // @ViewChild('doughnutCanvas') doughnutCanvas;
  @Output() variabelEvent : EventEmitter<any> = new EventEmitter();
  doughnutChart: any;
  username = localStorage.getItem("current_user");
  users=[];
  pengeluaran=[];
  pendapatan=[];
  pendapatans :number;
  pengeluarans : number;
  cicilan:number;
  Kebutuhan:number;
  tersier:number;
  tabungan:number;
  persenCicilan :number;
  persenKebutuhan :number;
  persentersier :number;
  persentabungan :number;
  keuangan : number = 0;
  kesehatan : boolean;
  keteranganPengeluaran=[];
  keteranganPendapatan : string;
  investasi : number;
  proteksi : number;
  cadangan : number;
  persenInvestasi: number;
  persenProteksi: number;
  persenCadangan: number;
  persenSimulasiCicilan:number;
  persenSimulasiKebutuhan:number;
  persenSimulasitabungan:number;
  persenSimulasiProteksi:number;
  persenSimulasiInvestasi:number;
  persenSimulasiCadangan:number;
  saldo : number;
  
  ngOnInit() {
    if(localStorage.getItem("current_user")==null){
      this.router.navigate(['/login']);
    }else{
      this.main.index(this.username).subscribe((data)=>{
        this.users = data;
        localStorage.setItem("idFam",data[0]['idFam']);
        localStorage.setItem("idUser",data[0]['iduser']);
        this. pendapatans = data[0]['totalPendapatan'];
        this. pengeluarans = data[0]['besarPengeluaran'];
        this.keteranganPengeluaran = data[0]['keteranganPengeluaran'];
        this.cicilan = data[0]['besarCicil'];
        this.Kebutuhan = data[0]['besarKebutuhan'];
        this.tabungan = data[0]['besarTabungan'];
        this.cadangan = data[0]['besarCadangan'];
        this.investasi = data[0]['besarInvest'];
        this.proteksi = data[0]['besarProteksi'];
        this.persenCicilan = (this.cicilan / this.pendapatans) * 100;
        this.persenKebutuhan = (this.Kebutuhan / this.pendapatans) * 100;
        this.persentabungan = (this.tabungan / this.pendapatans) * 100;
        this.persenInvestasi = (this.investasi / this.pendapatans) * 100;
        this.persenProteksi = (this.proteksi / this.pendapatans) * 100;
        this.persenCadangan = (this.cadangan / this.pendapatans) * 100;
        this.keuangan = this.pendapatans - this.pengeluarans;
        this.totalSisaKebutuhan = (1*this.keuangan) + (1*this.Kebutuhan);
        localStorage.setItem("saldo",this.keuangan.toString());
        if(this.persenCicilan <= 30){
          this.kesehatan = true;
        } else if (this.persenCicilan >= 30){
          this.kesehatan = false;
        }
        if(this.kesehatan == false){
          if(this.persenCicilan >= 30 && this.keuangan + this.Kebutuhan > 2500000){  
            this.persenSimulasiCicilan = this.pendapatans * 0.3;
            this.persenSimulasiKebutuhan =this.pendapatans * 0.5;
            this.persenSimulasitabungan =this.pendapatans * 0.03;
            this.persenSimulasiProteksi =this.pendapatans * 0.03;
            this.persenSimulasiInvestasi = this.pendapatans * 0.03;
            this.persenSimulasiCadangan =this.pendapatans * 0.05;
          } else if (this.keuangan + this.Kebutuhan < 2500000){
            this.persenSimulasiCicilan = this.pendapatans * 0.3;
            this.persenSimulasiKebutuhan = this.pendapatans * 0.5;
            this.persenSimulasitabungan = 0;
            this.persenSimulasiProteksi = this.pendapatans * 0.03;
            this.persenSimulasiInvestasi = 0;
            this.persenSimulasiCadangan =this.pendapatans * 0.05;

          }
        } else if(this.kesehatan == true) {
          if(this.persenCicilan != 0  && this.persenCicilan <= 30){
            this.persenSimulasiCicilan = this.pendapatans * 0.3;
            this.persenSimulasiKebutuhan =this.pendapatans * 0.5;
            this.persenSimulasitabungan =this.pendapatans * 0.05;
            this.persenSimulasiProteksi =this.pendapatans * 0.05;
            this.persenSimulasiInvestasi = this.pendapatans * 0.05;
            this.persenSimulasiCadangan =this.pendapatans * 0.05;
          } else if (this.persenCicilan == 0){
            this.persenSimulasiCicilan = this.pendapatans * 0.3;
            this.persenSimulasiKebutuhan =this.pendapatans * 0.6;
            this.persenSimulasitabungan =this.pendapatans * 0.1;
            this.persenSimulasiProteksi =this.pendapatans * 0.1;
            this.persenSimulasiInvestasi = this.pendapatans * 0.1;
            this.persenSimulasiCadangan =this.pendapatans * 0.1;
          }        
        } 
        this.showChart();
      });
    
      
    }
    console.log(this.persenSimulasiCadangan);
  }
  report(){
    let navigationExtras : NavigationExtras = {
      state:{
        data : [this.kesehatan,this.pendapatans,this.pengeluarans,this.cicilan,this.Kebutuhan,this.tabungan,this.keteranganPengeluaran,this.proteksi,this.cadangan,this.investasi,this.keuangan]
      }
    }
    this.router.navigate(['report'],navigationExtras);
  }
    showChart(){
      var canvas = document.getElementById('myChart') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      var chart = new Chart(ctx, {
        type: 'horizontalBar',    
        data: {
          labels: ['Cicilan', 'Kebutuhan', 'tabungan', 'Proteksi','Investasi','Cadangan'],
          datasets: [{
            label: "Persentase pengeluaran Ideal",
            data: [this.persenSimulasiCicilan, this.persenSimulasiKebutuhan, this.persenSimulasitabungan, this.persenSimulasiProteksi, this.persenSimulasiInvestasi, this.persenSimulasiCadangan],
            backgroundColor: [
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)'
            ],
            borderColor:[
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)',
              'rgba(30,144,255,0.5)'
            ],
            borderWidth: 3
          },{
            label: "Persentase pengeluaran Realita",
            data : [this.cicilan, this.Kebutuhan, this.tabungan, this.proteksi, this.investasi, this.cadangan],
            backgroundColor: [
              'rgba(255,204,0, 0.5)',
              'rgba(255,204,0, 0.5)',
              'rgba(255,204,0, 0.5)',
              'rgba(255,204,0, 0.5)',
              'rgba(255,204,0, 0.5)',
              'rgba(255,204,0, 0.5)'
            ],
            borderColor: [
              'rgba(255,204,0, 0.5)',
              'rgba(255,204,0, 0.5)',
              'rgba(255,204,0, 0.5)',
              'rgba(255,204,0, 0.5)',
              'rgba(255,204,0, 0.5)',
              'rgba(255,204,0, 0.5)'
            ],
            borderWidth: 3
          }]
        },
        plugins:[ChartDataLabels],
        // Configuration options go here
        options: {
          responsive: true,
          maintainAspectRatio: true,
          tooltips: {
            enabled: false
          },
          plugins: {
            datalabels: {
              color: 'black',
              font:{
                size: 16,
                weight:'bold'
              },
            },
            labels: {
              render: 'percentage',
              fontColor: ['green', 'white', 'red'],
              precision: 2
            }
          },
          legend:{
            position : 'bottom',
            labels:{
              fontSize : 16,
            }
          },
        },
        
      });
    }
  detail=[];
}

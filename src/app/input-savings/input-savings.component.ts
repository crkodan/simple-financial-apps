import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, AlertController, IonRouterOutlet } from '@ionic/angular';
import { FinanceService } from '../finance.service';
import { MainService } from '../main.service';
import { TabunganModalComponent } from '../tabungan-modal/tabungan-modal.component';

@Component({
  selector: 'app-input-savings',
  templateUrl: './input-savings.component.html',
  styleUrls: ['./input-savings.component.scss'],
})
export class InputSavingsComponent implements OnInit {

  constructor(private finance: FinanceService, private main : MainService, public route:Router, public alertController:AlertController, public modalCtrl : ModalController, private routerOutlet: IonRouterOutlet) { }

  ngOnInit() {
  }
  banks =[];
  kebutuhans =[];
  details=[];
  master = [];
  username = localStorage.getItem("current_user");
  iduser = localStorage.getItem("idUser");
  idfamily = localStorage.getItem("idFam");
  kategori:string;
  pilihan:string;
  keterangan:string;
  periode:number;
  periodes : number;
  bunga:number;
  biaya:number;
  total:Date;
  idSavings:number;
  waktuMenabung:number;
  idKebutuhan:string;
  idMasterTabungan : number;
  idBankTabungan : number;
  waktu:number;
  fv : number;
  faktorFVAnuitas:number;
  tabunganakhir : number;
  tabunganpertahun:number;
  checker:number = 1;
  
  clear(){
    this.bunga = null;
    this.biaya = null;
    this.waktu = null;
    this.tabunganakhir = null;
    this.periodes = 1;
  }
  inputTabungan(){
    if(this.checker == 2){
      if(this.periodes == 1){
        this.faktorFVAnuitas = (1-(Math.pow(1+((1*this.bunga)/100),(this.waktu*-1))))/((this.bunga*1)/100)
        this.tabunganakhir = this.biaya * this.faktorFVAnuitas;
        console.log(this.faktorFVAnuitas)
      } else if(this.periodes == 2){
        this.faktorFVAnuitas = (1-(Math.pow(1+(((1*this.bunga)/100)/12),(this.waktu*-1))))/(((this.bunga*1)/100)/12)
        this.tabunganakhir = this.biaya * this.faktorFVAnuitas;
        console.log(this.faktorFVAnuitas)
      } else if (this.waktu == null || this.biaya == null || this.bunga == null || this.periodes == null){
        this.alertNull();
      }
    }else if(this.checker == 1){
      if(this.periodes == 1){
        this.faktorFVAnuitas = (1-(Math.pow(1+((1*this.bunga)/100),(this.waktu * -1))))/((1*this.bunga)/100)
        this.biaya = this.tabunganakhir / this.faktorFVAnuitas;
        console.log(this.faktorFVAnuitas)
      } else if(this.periodes == 2){
        this.faktorFVAnuitas = (1-(Math.pow(1+(((1*this.bunga)/100)/12),(this.waktu * -1))))/(((1*this.bunga)/100)/12)
        this.biaya = this.tabunganakhir / this.faktorFVAnuitas;
        console.log(this.faktorFVAnuitas)
      } else if (this.waktu == null || this.tabunganakhir == null || this.bunga == null || this.periodes == null){
        this.alertNull();
      }
    } else if (this.checker == 3){
      if(this.periodes == 1){
        this.fv = Math.log(1-((this.tabunganakhir * (this.bunga / 100)/this.biaya)))
        this.faktorFVAnuitas = Math.log(1+((this.bunga*1)/100))
        this.waktu = -1 * (this.fv/this.faktorFVAnuitas)
        console.log(this.fv)
        console.log(this.faktorFVAnuitas)
      } else if (this.periodes == 2){        
        this.fv = Math.log(1-((this.tabunganakhir * ((this.bunga / 100)/12)/this.biaya)))
        this.faktorFVAnuitas = Math.log(1+(((this.bunga*1)/100)/12))
        this.waktu = -1 * (this.fv/this.faktorFVAnuitas)
        console.log(this.fv)
        console.log(this.faktorFVAnuitas)
      } else if (this.tabunganakhir == null || this.biaya == null || this.bunga == null || this.periodes == null){
        this.alertNull();
      }
    }
  }
  
  async alertNull() {
    const alert = await this.alertController.create({
      header: 'Peringatan!',
      message: 'Data tidak boleh kosong!',
      buttons: [{
        text:'OK'
      }],
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  async openmodal(){
    const modal = await this.modalCtrl.create({
      component : TabunganModalComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    await modal.present();
  }
}

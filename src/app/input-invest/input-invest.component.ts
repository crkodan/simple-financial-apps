import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, AlertController, IonRouterOutlet} from '@ionic/angular';
import { FinanceService } from '../finance.service';
import { InvestmentModalComponent } from '../investment-modal/investment-modal.component';
import { MainService } from '../main.service';

@Component({
  selector: 'app-input-invest',
  templateUrl: './input-invest.component.html',
  styleUrls: ['./input-invest.component.scss'],
})
export class InputInvestComponent implements OnInit {

  constructor(private finance : FinanceService, private main:MainService, public alertController : AlertController, private modalCtrl: ModalController, private routerOutlet: IonRouterOutlet) { }

  selectTabs = 'PNU';
  ngOnInit() {
    this.main.getKategoriInvestasi().subscribe(
      (data)=>{
        this.kategoris = data;
        this.id = data[0]['idkategori'];
        
      }
    )
  }
  kategoris=[];
  masters=[];
  id : string;
  username = localStorage.getItem("current_user");
  kebutuhans=[];
  iduser = localStorage.getItem("idUser");
  idfamily = localStorage.getItem("idFam");
  kategori:number;
  jenis:string;
  keterangan:string;
  periode:number;
  bunga:number;
  biaya:number;
  idKategori:number;
  idKebutuhan:string;
  waktuMenabung:number;
  waktu:number;
  faktorFVAnuitas:number;
  tipe:number;
  kategori2:number;
  investasiakhir:number;
  fv:number;
  faktorFV:number;
  bungas:number = 0;
  setButton:number;
  
  clearcache(){
  }
  getMaster(value: string):void{
    this.main.getMasterInvestasi(value).subscribe(
      (data)=>{
        this.masters = data;
      }
    )
  }
  getBunga(value: string):void{
    this.main.getBungaInvestasi(value).subscribe(
      (data)=>{
        this.bunga = data[0]['bunga'];
        this.bungas = this.bunga * 100;
      }
    )
    this.main.getDetailInvestasi(this.iduser,value).subscribe(
      (data)=>{
        this.biaya = data[0]['biaya'];
        this.periode = data[0]['periode'];
        this.waktu = data[0]['jangka'];
        this.investasiakhir = data[0]['total'];
        this.setButton = 1;
      }
    )
  }
  inputDetail(){
    if(this.periode == 1){
      this.fv = Math.pow((1+ ((1*this.bunga)/100)),1);
      this.faktorFV = (this.fv - 1) / ((1*this.bunga)/100);
      this.investasiakhir = this.biaya * this.faktorFV * (1+((1*this.bunga)/100));
    }
    else if(this.periode == 2){
      this.fv = Math.pow((1+ ((1*this.bunga)/100)),1);
      this.faktorFV = (this.fv - 1) / ((1*this.bunga)/100);
      this.investasiakhir = this.biaya * this.faktorFV;
    }
    else if(this.periode == 3){
      this.fv = Math.pow((1+ ((1*this.bunga)/100)),12);
      this.faktorFV = (this.fv - 1) / ((1*this.bunga)/100);
      this.investasiakhir = this.biaya * this.faktorFV * (1+((1*this.bunga)/100));
    }
    else if(this.periode == 4){
      this.fv = Math.pow((1+ ((1*this.bunga)/100)),12);
      this.faktorFV = (this.fv - 1) / ((1*this.bunga)/100);
      this.investasiakhir = this.biaya * this.faktorFV;
    }
    else if (this.bunga==null || this.biaya == null || this.periode == null || this.kategori == null || this.tipe == null){
      this.alertNull();
    }
  }
  HitungLamaInvestasi(){
    if(this.periode == 1){
      this.faktorFVAnuitas = Math.log(1-((this.investasiakhir*((1*this.bunga))/this.biaya)))
      this.fv = Math.log(1+((1*this.bunga)))
      this.waktu = -1*(this.faktorFVAnuitas / this.fv)
      console.log(this.faktorFVAnuitas)
      console.log(this.fv)
      console.log(this.faktorFV)
      }
    else if(this.periode == 2){
      this.faktorFVAnuitas = Math.log(1-((this.investasiakhir*((1*this.bunga)/12)/this.biaya)))
      this.fv = Math.log(1+((1*this.bunga)/12))
      this.waktu = -1*(this.faktorFVAnuitas / this.fv)
      console.log(this.faktorFVAnuitas)
      console.log(this.fv)
      console.log(this.faktorFV)
    }
    else if(this.periode == 3){
      this.faktorFVAnuitas = Math.log(this.investasiakhir / this.biaya)
      this.fv = Math.log(1+(1*this.bunga))
      this.waktu = this.faktorFVAnuitas / this.fv
    }
    else if (this.bunga==null || this.biaya == null || this.periode == null || this.kategori == null || this.tipe == null){
      this.alertNull();
    }
    this.main.changeDetailInvestasi(this.iduser,this.tipe,this.biaya,this.periode,this.waktu,this.investasiakhir).subscribe(
      (data)=>{
        if(data == 1){
          console.log("Data Submitted");
        } else {
          console.log("Error submitting data!");
        }
      }
    )
  }
  HitungInvestPeriode(){
    if(this.periode == 1){
      this.fv = (1-(Math.pow(1+(1*this.bunga),(this.waktu * -1))))/(1*this.bunga)
      this.biaya = this.investasiakhir / this.fv;
      console.log(this.faktorFVAnuitas)
      console.log(this.faktorFV)
      console.log(this.fv)
    }
    else if(this.periode == 2){
      this.fv = (1-(Math.pow(1+((1*this.bunga)/12),(this.waktu * -1))))/((1*this.bunga)/12)
      this.biaya = this.investasiakhir / this.fv;
      console.log(this.faktorFVAnuitas)
      console.log(this.faktorFV)
      console.log(this.fv)
    }
    else if(this.periode == 3){
      this.biaya = this.investasiakhir / Math.pow((1+(1*this.bunga)),this.waktu)
    }
    else if (this.investasiakhir == null || this.waktu == null  || this.periode == null || this.kategori == null || this.tipe == null){
      this.alertNull();
    }
    this.main.changeDetailInvestasi(this.iduser,this.tipe,this.biaya,this.periode,this.waktu,this.investasiakhir).subscribe(
      (data)=>{
        if(data == 1){
          console.log("Data Submitted");
        } else {
          console.log("Error submitting data!");
        }
      }
    )
  }
  HitungNilaiUang(){
    if(this.periode == 1){
      this.faktorFV = (1-(Math.pow(1+(1*this.bunga),(this.waktu * -1))))/(1*this.bunga)
      this.investasiakhir = this.faktorFV * this.biaya
      console.log(this.bunga)
      console.log(this.faktorFV)
    }
    else if(this.periode == 2){
      this.faktorFV = (1-(Math.pow(1+((1*this.bunga)/12),(this.waktu * -1))))/((1*this.bunga)/12)
      this.investasiakhir = this.faktorFV * this.biaya
      console.log(this.bunga)
      console.log(this.faktorFV)
    }
    else if(this.periode == 3){
      this.investasiakhir = this.biaya * (Math.pow((1+(1*this.bunga)),this.waktu))
    }
    else if (this.biaya == null || this.waktu == null  || this.periode == null || this.kategori == null || this.tipe == null){
      this.alertNull();
    }
    this.main.changeDetailInvestasi(this.iduser,this.tipe,this.biaya,this.periode,this.waktu,this.investasiakhir).subscribe(
      (data)=>{
        if(data == 1){
          console.log("Data Submitted");
        } else {
          console.log("Error submitting data!");
        }
      }
    )
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
      component : InvestmentModalComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    await modal.present();
  }
}

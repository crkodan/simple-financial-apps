import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, AlertController } from '@ionic/angular';
import { FinanceService } from '../finance.service';
import { MainService } from '../main.service';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss'],
})
export class InterestComponent implements OnInit {

  constructor(private finance:FinanceService, public router: Router, public main:MainService, public alertController : AlertController) { }
  kebutuhan=[];
  pilihan:number;
  bunga:number;
  waktu:number;
  biaya:number;
  menabung:number;
  fv:number;
  iduser = localStorage.getItem("idUser");
  ngOnInit() {
    this.main.getKebutuhan().subscribe(
      (data)=>{
        this.kebutuhan = data;
        this.bunga = data[0]['bunga'];
        console.log(this.kebutuhan);
      }
    )
  }
  getBunga(value:string):void{
    this.main.getBungaBarang(value).subscribe(
      (data)=>{
        this.bunga = data[0]['bunga'];
      }
    )
    this.main.getDetailKebutuhan(this.iduser,value).subscribe(
      (data)=>{
        this.biaya = data[0]['harga'];
        this.bunga = data[0]['bunga'];
        this.waktu = data[0]['waktu'];
        this.menabung = data[0]['total'];
      }
    )
  }
  kalkulasi(){
    if(this.bunga == null || this.waktu == null || this.biaya == null){
      this.alertNull();
    } else {
      this.fv = ((Math.pow(1+(1*this.bunga),this.waktu))-1)/this.bunga;
      this.menabung = this.biaya / this.fv; 
    }   
    this.main.changeDetailKebutuhan(this.iduser,this.pilihan,this.bunga,this.biaya,this.waktu,this.menabung).subscribe(
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

}

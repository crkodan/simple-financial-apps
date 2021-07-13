import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, AlertController } from '@ionic/angular';
import { FinanceService } from '../finance.service';
import { MainService } from '../main.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
@Pipe({
  name: 'groupBy',
})
export class HistoryComponent implements OnInit, PipeTransform {

  transform(value: any, groupByKey: string){
    const events: any[] = [];
    const groupedElements: any = {};

    value.forEach((obj: any) => {
      if (!(obj[groupByKey] in groupedElements)) {
        groupedElements[obj[groupByKey]] = [];
      }
      groupedElements[obj[groupByKey]].push(obj);
    });

    for (let prop in groupedElements) {
      if (groupedElements.hasOwnProperty(prop)) {
        events.push({
          key: prop,
          list: groupedElements[prop]
        });
      }
    }

    return events;
  }

  constructor(private finance:FinanceService, public router: Router, public main:MainService, public alertController : AlertController) { }
  keuangan =[];
  pengeluaran =[];
  pendapatan =[];
  start:Date;
  end:Date;
  kategoriPlus:string;
  tanggal : Date;
  user = localStorage.getItem("current_user");
  ngOnInit() {}

  tampilkan(){
    this.main.getRiwayat(this.user,this.start,this.end).subscribe(
      (data)=>{
        this.keuangan = data;
        console.log(data[0]['id']);
      }
    );
  }
  async deleteKeuangan(value:string){
    const alert = await this.alertController.create({
      header: 'Konfirmasi data',
      message:'Anda yakin akan menginputkan data keuangan anda?',
      buttons:[
        {
          text:'Batal',
          role:'cancel',
          handler:(cancel)=>{
            console.log('Data dibatalkan');
          }
        },{
          text:'Konfirmasi',
          handler:()=>{
          this.main.deleteKeuangan(value).subscribe(
            (data)=>{
              if(data == 1){
                this.presentAlert();
              } else {
                this.alertError();
              }
            }
          )
        }
      }
    ]
  });
  await alert.present();
  let result = await alert.onDidDismiss();
  }
  async editKeuangan(value:string){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit biaya keuangan',
      inputs: [
        {
          name: 'biaya',
          type: 'number',
          placeholder: 'Masukkan biaya'
        }
      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Konfirmasi',
          handler: (res) => {
            if(res.biaya != null){
              this.main.updateKeuangan(value,res.biaya).subscribe(
                (data)=>{
                  if(data == 1){
                    this.presentAlert();
                  } else {
                    this.alertError();
                  }
                }
              )
            } else if(res.biaya == null) {
              this.alertNull();
            }
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Peringatan!',
      message: 'Perubahan berhasil dilakukan!',
      buttons: [{
        text:'OK',
        handler:()=>{
          window.location.reload();
        }
      }],
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  async alertError() {
    const alert = await this.alertController.create({
      header: 'Peringatan!',
      message: 'Terjadi kesalahan dalam perubahan data!',
      buttons: [{
        text:'OK'
      }],
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
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

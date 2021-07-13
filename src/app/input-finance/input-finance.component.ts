import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, AlertController } from '@ionic/angular';
import { FinanceService } from '../finance.service';
import { MainService } from '../main.service';

@Component({
  selector: 'app-input-finance',
  templateUrl: './input-finance.component.html',
  styleUrls: ['./input-finance.component.scss'],
})
export class InputFinanceComponent implements OnInit {

  constructor(private finance:FinanceService, public router: Router, public main:MainService, public alertController: AlertController) { }

  selectTabs = 'inKat';
  // jenis = 'Pengeluaran';
  kebutuhans =[];
  kategoris = [];
  kategori = [];
  username = localStorage.getItem("current_user");
  iduser = localStorage.getItem("idUser");
  idfamily = localStorage.getItem("idFam");
  // saldo = parseInt(localStorage.getItem("saldo"));
  saldo : number;
  jenis:string = 'Pengeluaran';
  tingkatan:string;
  keterangan:string;
  biaya:number;
  tanggal:Date;
  idKategori:number;
  idKebutuhan:number;
  tipeKeuangan:string;
  amount:string;
  idParent:string;
  pendapatans :number;
  pengeluarans : number;
  keuangan : number = 0;
  ngOnInit() {
  }
  async inputDetail(){
    this.main.index(this.username).subscribe((data)=>{
      this. pendapatans = data[0]['totalPendapatan'];
      this. pengeluarans = data[0]['besarPengeluaran'];
      this.keuangan = this.pendapatans - this.pengeluarans;
      localStorage.setItem("saldo",this.keuangan.toString());
    })
    this.saldo = parseInt(localStorage.getItem("saldo"));
    if(this.biaya > this.saldo && this.tipeKeuangan == "2"){
      alert("Biaya yang akan dimasukkan melebihi saldo yang ada");
    } else if(this.biaya == null || this.tipeKeuangan == null || this.idKategori == null || this.idParent == null){
      this.alertNull();
    } else{
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
              this.finance.inputDetailKeuangan(this.biaya, this.idKategori,this.iduser,this.tipeKeuangan).subscribe(
                (data)=>{
                  if(data=="1"){
                    this.presentAlert();
                  } else {
                    this.alertError();
                  }
                }
              );
            }
          }
        ]
      });
      await alert.present();
      let result = await alert.onDidDismiss();
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Peringatan!',
      message: 'Data sudah ditambahkan!',
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
      message: 'Terjadi kesalahan dalam menambahkan data!',
      buttons: [{
        text:'OK'
      }],
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  getKeuangan(value:string):void{
    this.main.getKategoriKeuangan(value).subscribe(
      (data)=>{
        this.kategoris = data;
      }
    );
  }
  getKeuangans(value:string,values:string):void{
    this.main.getKategoriKeuangans(value,values).subscribe(
      (data)=>{
        this.kategori = data;
      }
    );
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
  async cekSaldo() {
    const alert = await this.alertController.create({
      header: 'Saldo : ',
      message: this.saldo.toString(),
      buttons: [{
        text:'OK',
      }],
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
}

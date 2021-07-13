import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private Http:HttpClient) { }

  public cekKeuangan = new Subject();

  index(user:string):Observable<any>{
    let body = new HttpParams();
    body = body.set('user',user);
    // return this.Http.post("http://192.168.1.23/monegement2/index.php",body);
    return this.Http.post("https://monegement.000webhostapp.com/monegement2/index.php",body);
  }
  getKeterangan(user:string):Observable<any>{
    let body = new HttpParams();
    body = body.set('user',user);
    // return this.Http.post("http://192.168.1.23/monegement2/keteranganNode.php",body);
    return this.Http.post("https://monegement.000webhostapp.com/monegement2/keteranganNode.php",body);
  }
  getBulanan(user:string):Observable<any>{
    let body = new HttpParams();
    body = body.set('user',user);
    // return this.Http.post("http://192.168.1.23/monegement2/getBulanan.php",body);
    return this.Http.post("https://monegement.000webhostapp.com/monegement2/getBulanan.php",body);
  }
  getKategoriKeuangan(kategori:string):Observable<any>{
    let body = new HttpParams();
    body = body.set('kategori',kategori);
    // return this.Http.post("http://192.168.1.23/monegement2/getKategori.php",body);
    return this.Http.post("https://monegement.000webhostapp.com/monegement2/getKategori.php",body);
  }
  getKategoriKeuangans(kategori:string,idParent:string):Observable<any>{
    let body = new HttpParams();
    body = body.set('kategori',kategori);
    body = body.set('idParent',idParent);
    // return this.Http.post("http://192.168.1.23/monegement2/getKeuangans.php",body);
    return this.Http.post("https://monegement.000webhostapp.com/monegement2/getKeuangans.php",body);
  }
  getMasterInvestasi(idKategori:string):Observable<any>{
    let body = new HttpParams();
    body = body.set('idKategori',idKategori);    
    // return this.Http.post("http://192.168.1.23/monegement2/getMasterInvest.php",body);
    return this.Http.post("https://monegement.000webhostapp.com/monegement2/getMasterInvest.php",body);
  }
  getBungaInvestasi(id:string):Observable<any>{
    let body = new HttpParams();
    body = body.set('id',id);
    // return this.Http.post("http://192.168.1.23/monegement2/getBungaInvest.php",body);
    return this.Http.post("https://monegement.000webhostapp.com/monegement2/getBungaInvest.php",body);
  }
  getRiwayat(user:string,start:Date,end:Date):Observable<any>{
    let body = new HttpParams();
    body = body.set('user',user);
    body = body.set('start',start.toString());
    body = body.set('end',end.toString());    
    // return this.Http.post("http://192.168.1.23/monegement2/getRiwayat.php",body);
    return this.Http.post("https://monegement.000webhostapp.com/monegement2/getRiwayat.php",body);
  }
  getKebutuhan():Observable<any>{
    // return this.Http.get("http://192.168.1.23/monegement2/getKebutuhan.php");
    return this.Http.get("https://monegement.000webhostapp.com/monegement2/getKebutuhan.php");
  }
  getBungaBarang(id:string):Observable<any>{
    let body = new HttpParams();
    body = body.set('id',id);
    // return this.Http.post("http://192.168.1.23/monegement2/getBungaKebutuhan.php",body);
    return this.Http.post("https://monegement.000webhostapp.com/monegement2/getBungaKebutuhan.php",body);
  }
  getDetailKeterangan(user:string,tingkatan:string):Observable<any>{
    let body = new HttpParams();
    body = body.set('user',user);
    body = body.set('tingkatan',tingkatan);
    // return this.Http.post("http://192.168.1.23/monegement2/showTingkatan.php",body);
    return this.Http.post("https://monegement.000webhostapp.com/monegement2/showTingkatan.php",body);
  }
  getKategoriInvestasi():Observable<any>{
    // return this.Http.get("http://192.168.1.23/monegement2/getKategoriInvest.php");
    return this.Http.get("https://monegement.000webhostapp.com/monegement2/getKategoriInvest.php");
  }
  deleteKeuangan(id:string):Observable<any>{
    let body = new HttpParams();
    body = body.set('id',id);
    // return this.Http.post("http://192.168.1.23/monegement2/deleteKeuangan.php",body);
    return this.Http.post("https://monegement.000webhostapp.com/monegement2/deleteKeuangan.php",body);
  }
  updateKeuangan(id:string, biaya:number):Observable<any>{
    let body = new HttpParams();
    body = body.set('id',id);
    body = body.set('biaya',biaya.toString());
    // return this.Http.post("http://192.168.1.23/monegement2/updateKeuangan.php",body);
    return this.Http.post("https://monegement.000webhostapp.com/monegement2/updateKeuangan.php",body);
  }
  getDetailInvestasi(idUser:string, idInvest:string):Observable<any>{
    let body = new HttpParams();
    body = body.set('idUser',idUser);
    body = body.set('idInvest',idInvest.toString());
    // return this.Http.post("http://192.168.1.23/monegement2/detailInvestasi.php",body);    
    return this.Http.post("https://monegement.000webhostapp.com/monegement2/detailInvestasi.php",body);   
  }
  changeDetailInvestasi(idUser:string, idInvest:number,biaya:number,periode:number,waktu:number, total : number):Observable<any>{
    let body = new HttpParams();
    body = body.set('idUser',idUser);
    body = body.set('idInvest',idInvest.toString());
    body = body.set('biaya',biaya.toString());
    body = body.set('periode',periode.toString());
    body = body.set('waktu',waktu.toString());
    body = body.set('total',total.toString());
    // return this.Http.post("http://192.168.1.23/monegement2/newDetailInvestasi.php",body);   
    return this.Http.post("https://monegement.000webhostapp.com/monegement2/newDetailInvestasi.php",body);       
  }
  getDetailKebutuhan(idUser:string, idKebutuhan:string):Observable<any>{
    let body = new HttpParams();
    body = body.set('idUser',idUser);
    body = body.set('idKebutuhan',idKebutuhan.toString());
    // return this.Http.post("http://192.168.1.23/monegement2/detailkebutuhan.php",body);    
    return this.Http.post("https://monegement.000webhostapp.com/monegement2/detailkebutuhan.php",body);    
  }
  changeDetailKebutuhan(idUser:string, idKebutuhan:number,bunga:number,harga:number,waktu:number, total : number):Observable<any>{
    let body = new HttpParams();
    body = body.set('idUser',idUser);
    body = body.set('idKebutuhan',idKebutuhan.toString());
    body = body.set('bunga',bunga.toString());
    body = body.set('harga',harga.toString());
    body = body.set('waktu',waktu.toString());
    body = body.set('total',total.toString());
    // return this.Http.post("http://192.168.1.23/monegement2/newDetailKebutuhan.php",body);   
    return this.Http.post("https://monegement.000webhostapp.com/monegement2/newDetailKebutuhan.php",body);       
  }



  // getKeuangan(user:string):Observable<any>{
  //   let body = new HttpParams();
  //   body = body.set('user',user);
  //   return this.Http.post("http://192.168.1.23/monegement2/getKeuangan.php",body);
  // }
  // getPengeluaran(user:string):Observable<any>{
  //   let body = new HttpParams();
  //   body = body.set('user',user);
  //   return this.Http.post("http://192.168.1.23/monegement2/getPengeluaran.php",body);
  // }
  // getPendapatan(user:string):Observable<any>{
  //   let body = new HttpParams();
  //   body = body.set('user',user);
  //   return this.Http.post("http://192.168.1.23/monegement2/getPendapatan.php",body);
  // }
  // getKategoriTabungan(user:string):Observable<any>{
  //   let body = new HttpParams();
  //   body = body.set('user',user);
  //   return this.Http.post("http://192.168.1.23/monegement2/getKategoriTabungan.php",body);
  // }
  // getBankTabungan():Observable<any>{
  //   return this.Http.get("http://192.168.1.23/monegement2/getBankTabungan.php");
  // }
  // getMasterTabungan(idBank:string):Observable<any>{
  //   let body = new HttpParams();
  //   body = body.set('idBank',idBank);
  //   return this.Http.post("http://192.168.1.23/monegement2/getMasterTabungan.php",body);
  // }
  // getDetailTabungan(idMaster:string):Observable<any>{
  //   let body = new HttpParams();
  //   body = body.set('idMaster',idMaster);
  //   return this.Http.post("http://192.168.1.23/monegement2/getDetailTabungan.php",body);
  // }
  // getWaktuTabungan(waktu:number,idBank:string):Observable<any>{
  //   let body = new HttpParams();
  //   body = body.set('idBank',idBank);
  //   body = body.set('waktu',waktu.toString());
  //   return this.Http.post("http://192.168.1.23/monegement2/getWaktuTabungan.php",body);    
  // }
}

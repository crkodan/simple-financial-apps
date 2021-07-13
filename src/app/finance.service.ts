import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private Http:HttpClient) { }

  private _refreshNeeded = new Subject<void>();
  private _refreshNeededs = new Subject<void>();

  inputDetailKeuangan(biaya:number,idtingkat:number,user:string,idkategori){
    let body = new HttpParams();
    body = body.set('biaya',biaya.toString());
    body = body.set('idtingkat',idtingkat.toString());
    body = body.set('idkategori',idkategori.toString());
    body = body.set('idUser',user.toString());
    // return this.Http.post("http://192.168.1.23/monegement2/newDetailKeuangan.php",body).pipe(tap(()=>{this._refreshNeededs.next();}));
    return this.Http.post("https://monegement.000webhostapp.com/monegement2/newDetailKeuangan.php",body).pipe(tap(()=>{this._refreshNeededs.next();}));
  }
}

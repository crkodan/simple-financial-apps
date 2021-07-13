import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  login(username:string, password:string){
    let body = new HttpParams();
    body = body.set('username',username);
    body = body.set('password',password);
    // return this.http.post("http://192.168.1.23/monegement2/logins.php",body);
    return this.http.post("https://monegement.000webhostapp.com/monegement2/logins.php",body);
  }

  registerNewFam(username:string,nama:string,password:string,famName:string){
    let body = new HttpParams();
    body = body.set('username',username);
    body = body.set('password',password);
    body = body.set('famName',famName);
    body = body.set('nama',nama);
    // return this.http.post("http://192.168.1.23/monegement2/registerNew.php",body);
    return this.http.post("https://monegement.000webhostapp.com/monegement2/registerNew.php",body);
  }

  registerToFam(username:string,nama:string,password:string,famCode:string){
    let body = new HttpParams();
    body = body.set('username',username);
    body = body.set('password',password);
    body = body.set('famCode',famCode);
    body = body.set('nama',nama);
    // return this.http.post("http://172.21.0.1/monegement2/registerJoin.php",body);
    return this.http.post("https://monegement.000webhostapp.com/monegement2/registerJoin.php",body);
  }
  getUserDetail(username:string):Observable<any>{
    let body = new HttpParams();
    body = body.set('username',username);
    // return this.http.post("http://172.18.81.113/monegement2/getUserDetail.php",body);
    return this.http.post("https://monegement.000webhostapp.com/monegement2/getUserDetail.php",body);
  }
}

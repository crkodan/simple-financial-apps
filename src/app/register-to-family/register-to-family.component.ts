import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-to-family',
  templateUrl: './register-to-family.component.html',
  styleUrls: ['./register-to-family.component.scss'],
})
export class RegisterToFamilyComponent implements OnInit {

  constructor(public auth:AuthService, private router:Router) { }
  username:string;
  nama:string;
  password:string;
  familyCode:string;
  ngOnInit() {}

  registerToFam(){
    if(this.username == null || this.nama == null || this.password == null || this.familyCode == null){
      alert("Data tidak boleh ada yang kosong!");
      this.password = "";
      this.familyCode = "";
    } else {
      this.auth.registerToFam(this.username,this.nama,this.password,this.familyCode).subscribe(
        (data)=>{
          if(data=="1"){
            alert("Berhasil registrasi! Silahkan login!");
            this.router.navigate(['/login']);
          } else {
            alert("Registrasi gagal! Silahkan ulangi proses registrasi!");
            this.password = "";
            this.familyCode = "";
          }
        }
      )
    }
  }
}

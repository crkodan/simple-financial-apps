import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-new-family',
  templateUrl: './register-new-family.component.html',
  styleUrls: ['./register-new-family.component.scss'],
})
export class RegisterNewFamilyComponent implements OnInit {

  constructor(public auth:AuthService, private router:Router) { }
  username:string;
  nama:string;
  password:string;
  famName:string;

  ngOnInit() {}

  RegisterNewFam(){
    if(this.username == null || this.nama == null || this.password == null || this.famName == null){
      alert("Data tidak boleh ada yang kosong!");
      this.password = "";
    } else {
      this.auth.registerNewFam(this.username,this.nama,this.password,this.famName).subscribe(
        (data)=>{
          if(data=="1"){
            alert("Berhasil registrasi! Silahkan login!");
            this.router.navigate(['/login']);
          } else {
            alert("Registrasi gagal! Silahkan ulangi proses registrasi!");
            this.password = "";
            this.famName = "";
          }
        }
      )
    }
  }

}

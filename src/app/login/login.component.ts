import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { MenuController, ModalController } from '@ionic/angular';
import { RegistwindowModalComponent } from '../registwindow-modal/registwindow-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, private router:Router, private modalCtrl: ModalController, public menuCtrl : MenuController) { }
  username:string;
  password:string;
  ngOnInit() {}
  user :any;
  login(){
    this.menuCtrl.enable(false);
    this.auth.login(this.username,this.password).subscribe(
      (data)=>{
        if(data == "1"){
          window.location.reload();
          localStorage.setItem("current_user",this.username);
          this.router.navigate(['/home']);
        }else{
          alert("Login gagal! Periksa kembali Username dan password anda!");
          this.username = "";          
          this.password = "";
        }
      }
    );
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component:RegistwindowModalComponent
    });
    await modal.present();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}

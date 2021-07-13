import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { MenuController, ModalController } from '@ionic/angular';
import { RegistwindowModalComponent } from '../registwindow-modal/registwindow-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public auth: AuthService, private router:Router, private modalCtrl: ModalController, public menuCtrl : MenuController) { }
  username:string;
  password:string;
  ngOnInit() {}
  user =[];
  login(){
    this.auth.login(this.username,this.password).subscribe(
      (data)=>{
        if(data == "1"){          
          localStorage.setItem("current_user",this.username);
          // localStorage.setItem("user_id",data[0]['iduser']);
          this.router.navigate(['/home']);
          // alert(localStorage.getItem("current_user"));
        }else{
          alert(data);
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

import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tabungan-modal',
  templateUrl: './tabungan-modal.component.html',
  styleUrls: ['./tabungan-modal.component.scss'],
})
export class TabunganModalComponent {

  constructor(private modalCtrl: ModalController) { }

  dissmisModal(){
    this.modalCtrl.dismiss();
  }

}

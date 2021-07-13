import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-financeliteracy-modal',
  templateUrl: './financeliteracy-modal.component.html',
  styleUrls: ['./financeliteracy-modal.component.scss'],
})
export class FinanceliteracyModalComponent {

  constructor(private modalCtrl: ModalController) { }

  dissmisModal(){
    this.modalCtrl.dismiss();
  }

}

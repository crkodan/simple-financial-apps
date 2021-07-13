import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-investment-modal',
  templateUrl: './investment-modal.component.html',
  styleUrls: ['./investment-modal.component.scss'],
})
export class InvestmentModalComponent {

  constructor(private modalCtrl: ModalController) { }

  dissmisModal(){
    this.modalCtrl.dismiss();
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-registwindow-modal',
  templateUrl: './registwindow-modal.component.html',
  styleUrls: ['./registwindow-modal.component.scss'],
})
export class RegistwindowModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}

import { Component } from '@angular/core';
import { NavController, AlertController, MenuController } from 'ionic-angular';
import { ObjetivoEdicaoPage } from '../objetivo-edicao/objetivo-edicao';
import { ObjetivoPage } from '../objetivo/objetivo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  metas = [100, 523, 731, 1000, 1200];

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private menuCtrl: MenuController) {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  abrir(meta) {
    this.navCtrl.push(ObjetivoPage);
  }

  novo() {
    this.navCtrl.push(ObjetivoEdicaoPage, {meta: 0});
  }

  editar(meta) {
    this.navCtrl.push(ObjetivoEdicaoPage, {meta: meta});
  }

  remover(meta) { 
    this.alertCtrl.create({
      message: 'Você realmente deseja remover essa meta?',
      buttons: [
        {text: "Cancelar", role: 'cancel'},
        {text: "Ok", handler:() => {
          let index = this.metas.indexOf(meta);
          this.metas.splice(index, 1);
        }}
      ]
    }).present(); 
  }

}

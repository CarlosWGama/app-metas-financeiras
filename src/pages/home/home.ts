import { Component } from '@angular/core';
import { NavController, AlertController, MenuController } from 'ionic-angular';
import { ObjetivoEdicaoPage } from '../objetivo-edicao/objetivo-edicao';
import { ObjetivoPage } from '../objetivo/objetivo';
import { Meta } from '../../models/Meta';
import { Frequencia } from '../../models/Frequencia';

declare var firebase;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  metas: Meta[] = [
    new Meta('1', 'Aposentadoria', 100000, 1000, true, '2050-01-01', Frequencia.MENSAL, 300, ['carloswgama@gmail.com']),
    new Meta('2', 'Casamento', 20000, 3000, true, '2020-07-08', Frequencia.MENSAL, 300, ['carloswgama@gmail.com', 'mylanagama@gmail.com']),
    new Meta('3', 'Reserva', 15000, 17000, true, '2024-01-01', Frequencia.MENSAL, 300, ['carloswgama@gmail.com'])
  ]


  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private menuCtrl: MenuController) {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  abrir(meta) {
    this.navCtrl.push(ObjetivoPage, {meta: meta});
  }

  novo() {
    this.navCtrl.push(ObjetivoEdicaoPage, {meta: new Meta()});
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

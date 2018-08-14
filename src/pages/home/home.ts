import { Component } from '@angular/core';
import { NavController, AlertController, MenuController } from 'ionic-angular';
import { ObjetivoEdicaoPage } from '../objetivo-edicao/objetivo-edicao';
import { ObjetivoPage } from '../objetivo/objetivo';
import { Meta } from '../../models/Meta';
import { MetaProvider } from '../../providers/meta/meta';

declare var firebase;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  metas: Meta[] = [];


  totalInvestido = 0;
  totalAlcancar = 0;
  porcentagem = 0;
  totalMetas = 0;
  metasAlcancada = 0;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, 
    private menuCtrl: MenuController, private metaProvider: MetaProvider) {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.metaProvider.buscarTodos(firebase.auth().currentUser.uid).then((metas) => {
      this.metas = metas;

      //Recupera os dados a serem preechidos
      this.metas.forEach((meta) => {
        this.totalAlcancar = meta.objetivo;
        this.totalInvestido = meta.acumulado;
        this.totalMetas++;
        if (meta.acumulado >= meta.objetivo)
          this.metasAlcancada++;
      });

      if (this.totalAlcancar > 0)
        this.porcentagem = parseInt(((this.totalInvestido * 100) / this.totalAlcancar).toFixed(0));
    });
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

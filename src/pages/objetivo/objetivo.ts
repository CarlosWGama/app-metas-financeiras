import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { OpcoesObjetivoPage } from '../opcoes-objetivo/opcoes-objetivo';
import { ObjetivoGeralPage } from '../objetivo-geral/objetivo-geral';
import { ObjetivoCategoriaPage } from '../objetivo-categoria/objetivo-categoria';

/**
 * @author Carlos W. Gama
 */

@IonicPage()
@Component({
  selector: 'page-objetivo',
  templateUrl: 'objetivo.html',
})
export class ObjetivoPage {

  meta: number = 1;
  tabGeral = ObjetivoGeralPage;
  tabCategoria = ObjetivoCategoriaPage;
  tabParams: {meta: number} = null;

  
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private popoverCtrl: PopoverController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.tabParams = {meta: this.meta};

    console.log('ionViewDidLoad ObjetivoPage');
  }

  opcoes(event, meta) {
    this.popoverCtrl.create(OpcoesObjetivoPage, {meta: meta}).present({ev: event});
  }

}

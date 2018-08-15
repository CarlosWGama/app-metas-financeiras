import { Component, AfterContentInit, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, Events } from 'ionic-angular';
import { OpcoesObjetivoPage } from '../opcoes-objetivo/opcoes-objetivo';
import { ObjetivoGeralPage } from '../objetivo-geral/objetivo-geral';
import { ObjetivoCategoriaPage } from '../objetivo-categoria/objetivo-categoria';
import { Meta } from '../../models/Meta';

/**
 * @author Carlos W. Gama
 */

@IonicPage()
@Component({
  selector: 'page-objetivo',
  templateUrl: 'objetivo.html',
})
export class ObjetivoPage {

  meta: Meta = new Meta();
  tabGeral = ObjetivoGeralPage;
  tabCategoria = ObjetivoCategoriaPage;
  tabParams: {meta: Meta} = null;

  
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private popoverCtrl: PopoverController, private alertCtrl: AlertController, private events: Events) {
  }

  ionViewDidLoad() {
    this.meta.initialize(this.navParams.get("meta"));
    this.tabParams = this.navParams.data;

    //Recupera das modificaçoes realizadas no ObjetivoGeral
    this.events.subscribe("meta:atualiza", (meta) => {
      this.meta.initialize(meta);
      this.tabParams = {meta: this.meta};
      console.log("Atualiza Objetivo");
    });
    
    //Ajuste de Bug do Ionic
    setTimeout(() => {
      this.events.publish("meta:inicia", this.meta);
      console.log("Publica");
    }, 100);
    
    console.log('ionViewDidLoad ObjetivoPage');
  }

  opcoes(event) {
    this.popoverCtrl.create(OpcoesObjetivoPage, {meta: this.meta}).present({ev: event});
  }

}

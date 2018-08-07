import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { Storage } from '@ionic/storage';

/**
 * @Carlos W. Gama
 */

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {

  idioma: string = 'en';

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private translate: TranslateService, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracoesPage');
  }

  salvar() {
    this.translate.use(this.idioma);
    this.storage.set("idioma", this.idioma);
  }

}

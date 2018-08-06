import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracoesPage');
  }

  salvar() {
    this.translate.use(this.idioma);
  }

}

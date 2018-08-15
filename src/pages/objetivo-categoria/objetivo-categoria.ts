import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Meta } from '../../models/Meta';

/**
 * @author Carlos W. Gama
 */

@IonicPage()
@Component({
  selector: 'page-objetivo-categoria',
  templateUrl: 'objetivo-categoria.html',
})
export class ObjetivoCategoriaPage {

  meta: Meta = new Meta();

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private events: Events) {
  }

  ionViewDidLoad() {
    this.meta.initialize(this.navParams.get("meta"));
    console.log(this.meta);
    this.events.subscribe("meta:atualiza", (meta) => {
      this.meta.initialize(meta);
    });
    console.log('ionViewDidLoad ObjetivoCategoriaPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * @author Carlos W. Gama
 */

@IonicPage()
@Component({
  selector: 'page-objetivo-categoria',
  templateUrl: 'objetivo-categoria.html',
})
export class ObjetivoCategoriaPage {

  meta: any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.meta = this.navParams.get("meta") as number;
    console.log(this.meta);
    console.log('ionViewDidLoad ObjetivoCategoriaPage');
  }

}

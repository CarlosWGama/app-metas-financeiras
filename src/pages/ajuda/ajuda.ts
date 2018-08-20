import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * @author Carlos W. Gama
 * @since 0.2.0
 */

@IonicPage()
@Component({
  selector: 'page-ajuda',
  templateUrl: 'ajuda.html',
})
export class AjudaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjudaPage');
  }

  toggle(element: HTMLElement) {
    console.log(element);
    element.style.display  = (element.style.display != 'block' ? 'block' : 'none');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular/umd';
import { HomePage } from '../home/home';

/**
 * @author Carlos W. Gama
 *
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
      private alertCtrl: AlertController, private menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(false);
  }

  logar() {
    this.navCtrl.setRoot(HomePage);
  }

  cadastrar() {
    this.alertCtrl.create({
      message: "Erro",
      buttons: ["Ok"]
    }).present();
  }

  loginFacebook() {

  }

  loginGoogle() {

  }

}

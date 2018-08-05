import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ViewController } from 'ionic-angular';
import { ObjetivoEdicaoPage } from '../objetivo-edicao/objetivo-edicao';
import { HomePage } from '../home/home';

/**
 * @author Carlos W. Gama
 */

@IonicPage()
@Component({
  selector: 'page-opcoes-objetivo',
  templateUrl: 'opcoes-objetivo.html',
})
export class OpcoesObjetivoPage {

  meta: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private alertCtrl: AlertController, private toastCtrl: ToastController,
    private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.meta = this.navParams.get("meta") as number;
    console.log('ionViewDidLoad OpcoesObjetivoPage');
  }

  editar() {
    this.navCtrl.push(ObjetivoEdicaoPage, {meta: this.meta});
  }

  sair() { 
    this.alertCtrl.create({
      message: 'Você realmente deseja remover essa meta da sua lista?',
      buttons: [
        {text: "Cancelar", role: 'cancel'},
        {text: "Ok", handler:() => {
          
          this.toastCtrl.create({
            message: "Meta removida",
            duration: 3000
          }).present();

          this.viewCtrl.dismiss().then(() => {
            //this.navCtrl.setRoot(HomePage);
            this.navCtrl.insert(0, HomePage);
            this.navCtrl.popToRoot();

          })

        }}
      ]
    }).present(); 
  }
}

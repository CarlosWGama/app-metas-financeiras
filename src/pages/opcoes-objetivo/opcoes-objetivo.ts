import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ViewController } from 'ionic-angular';
import { ObjetivoEdicaoPage } from '../objetivo-edicao/objetivo-edicao';
import { HomePage } from '../home/home';
import { Meta } from '../../models/Meta';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { MetaProvider } from '../../providers/meta/meta';

/**
 * @author Carlos W. Gama
 */

@IonicPage()
@Component({
  selector: 'page-opcoes-objetivo',
  templateUrl: 'opcoes-objetivo.html',
})
export class OpcoesObjetivoPage {

  meta: Meta = new Meta();

  //Conteudos de tradução
  transBtnCancelar;
  transBtnOK;
  transMsgDeletar;
  transAlertRemoved;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private toastCtrl: ToastController,
    private viewCtrl: ViewController, private translate: TranslateService,
    private metaProvider: MetaProvider) {
  }

  ionViewDidLoad() {
    this.meta.initialize(this.navParams.get("meta") as Meta);

    this.translate.get("CANCEL").toPromise().then((msg) => this.transBtnCancelar = msg);
    this.translate.get("OK").toPromise().then((msg) => this.transBtnOK = msg);
    this.translate.get("REMOVE_GOAL").toPromise().then((msg) => this.transMsgDeletar = msg);
    this.translate.get("ALERT_GOAL_REMOVED").toPromise().then((msg) => this.transAlertRemoved = msg);

  }

  editar() {
    this.navCtrl.push(ObjetivoEdicaoPage, {meta: this.meta});
  }

  sair() { 
    this.alertCtrl.create({
      message: this.transMsgDeletar,
      buttons: [
        {text: this.transBtnCancelar, role: 'cancel'},
        {text: this.transBtnOK, handler:() => {
          
          this.toastCtrl.create({
            message: this.transAlertRemoved,
            duration: 3000
          }).present();
          
          this.metaProvider.removerMeta(this.meta);

          this.viewCtrl.dismiss().then(() => {
            this.navCtrl.insert(0, HomePage);
            this.navCtrl.popToRoot();

          })

        }}
      ]
    }).present(); 
  }
}

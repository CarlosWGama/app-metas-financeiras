import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { LoginValidation } from '../LoginValidation';
import { AppConfig } from '../../models/AppConfig';

declare var firebase;
/**
 * @Carlos W. Gama
 */
@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage extends LoginValidation {

  idioma: string = 'en';
  idiomas = AppConfig.IDIOMAS_DISPONIVEIS;

  logadoEmailSenha:boolean = false;
  senha: string = '';
  senha2: string = '';

  transErroSenhaIncompativeis;
  transSenhasAtualizadas;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    translate: TranslateService, private storage: Storage,
    alertCtrl: AlertController, private toastCtrl: ToastController) {
      super(translate, alertCtrl);
  }

  ionViewDidLoad() {
    console.log(firebase.auth().currentUser.providerData[0].providerId);
    this.translate.get("ERROR_PASSWORD_CONFIRM").toPromise().then((msg) => this.transErroSenhaIncompativeis = msg);
    this.translate.get("PASSWORD_UPDATED").toPromise().then((msg) => this.transSenhasAtualizadas = msg);
    this.logadoEmailSenha = (firebase.auth().currentUser.providerData[0].providerId == 'password')
    console.log('ionViewDidLoad ConfiguracoesPage');
  }

  salvar() {
    if (this.logadoEmailSenha && this.senha != '') {
        if (this.senha == this.senha2) {
            firebase.auth().currentUser.updatePassword(this.senha).then(() => {
              this.toastCtrl.create({
                message:  this.transSenhasAtualizadas,
                duration: 3000
              }).present();
            }).catch((error) => {
              console.log(error);
              this.chamarErro(error.code);
            });
        } else {
          this.chamarAlerta(this.transErroSenhaIncompativeis);
        }
    }

    this.translate.use(this.idioma);
    this.storage.set("idioma", this.idioma);
  }

}

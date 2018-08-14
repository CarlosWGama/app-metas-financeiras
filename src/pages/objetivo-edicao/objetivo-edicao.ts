import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { DataUtil } from '../../util/DataUtil';
import { Frequencia } from '../../models/Frequencia';
import { Meta } from '../../models/Meta';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { MetaProvider } from '../../providers/meta/meta';

declare var firebase;
@IonicPage()
@Component({
  selector: 'page-objetivo-edicao',
  templateUrl: 'objetivo-edicao.html',
})
export class ObjetivoEdicaoPage {

  meta: Meta = new Meta();

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private toastCtrl: ToastController, private alertCtrl: AlertController,
    private usuarioProvider: UsuarioProvider, private loadingCtrl: LoadingController,
    private translate: TranslateService, private metaProvider:MetaProvider) {
  }

  ionViewDidLoad() {
    this.meta = this.navParams.get("meta") as Meta;
    console.log(this.meta);
    if (this.meta == null) this.meta = new Meta();
    this.meta.addMembro(firebase.auth().currentUser.email);
    console.log('ionViewDidLoad ObjetivoEdicaoPage');
  }

  adicionarMembro() {
    this.alertCtrl.create({
      title:"Adicionar membro",
      message: "Apenas usuários do Minhas Metas Financeiras podem ser adicionados. Uma vez adicionado, apenas o próprio usuário poderá pedir para sair da meta",
      inputs:[
        {name: "email", type:"email", placeholder: "Informe o email do usuário"}
      ], 
      buttons: [
        {text: "Cancelar", role: "cancel"},
        {text: "Adicionar", handler:(dados) => {
          if (dados.email == "") {
            this.translate.get("INVALID_EMAIL").toPromise().then((msg) => { this.chamarAlerta(msg) });
          } else {

            let load = this.loadingCtrl.create({content: "Aguarde", enableBackdropDismiss: false});
            load.present();
            this.usuarioProvider.exist(dados.email).then((achou) => {
              if (achou) {
                this.meta.addMembro(dados.email);
                this.recomendado();
              } else 
                this.translate.get("INVALID_EMAIL").toPromise().then((msg) => { this.chamarAlerta(msg) });
              load.dismiss();
              
            });
            
          }
        }}
      ]

    }).present();
  }

  /**
   * Exibe uma mensagem de erro para  o usuário
   * @param mensagem 
   */
  private chamarAlerta(mensagem: string) {
    this.alertCtrl.create({
      title: "Erro",
      message: mensagem,
      buttons: ["Ok"]
    }).present();
  }

  recomendado() {
    let resta = this.meta.objetivo - this.meta.acumulado;
    if (resta <= 0)
      this.meta.valorRecomendado = 0;
    else {
      console.log(this.meta.prazo);
      if (this.meta.temPrazo == true && this.meta.prazo != undefined) {
        let dias = DataUtil.diferencaDias(this.meta.prazo);
        console.log(dias);
        let valorAoDia = parseFloat((resta/dias).toFixed(2));
        valorAoDia /= this.meta.membros.length;
        if (this.meta.frequencia == Frequencia.DIARIA) this.meta.valorRecomendado = valorAoDia;
        if (this.meta.frequencia == Frequencia.SEMANAL) this.meta.valorRecomendado = valorAoDia * 7;
        if (this.meta.frequencia == Frequencia.MENSAL) this.meta.valorRecomendado = valorAoDia * 30;
        if (this.meta.frequencia == Frequencia.SEMESTRAL) this.meta.valorRecomendado = valorAoDia * 30 * 6;
        if (this.meta.frequencia == Frequencia.ANUAL) this.meta.valorRecomendado = valorAoDia * 365;
        if (this.meta.valorRecomendado > resta) this.meta.valorRecomendado = resta;
        this.meta.valorRecomendado = parseFloat(this.meta.valorRecomendado.toFixed(2));
      }
    }
  }

  /**
   * Salva a meta
   */
  salvar() {
    if (this.validar()) {
      if (this.meta.id == "") {
        this.metaProvider.cadastrar(this.meta);
      } else {
        this.metaProvider.atualizar(this.meta);
      }

      this.toastCtrl.create({
        message: "Meta salva com sucesso",
        duration: 3000
      }).present();
      this.navCtrl.pop();
    }
  }

  /**
   * Valida o formuário
   */
  validar():boolean {
    if (this.meta.titulo == "") {
      this.translate.get("TITLE_REQUIRED").toPromise().then((msg) => { this.chamarAlerta(msg) });
      return false;
    }

    if (this.meta.objetivo == 0) {
      this.translate.get("GOAL_REQUIRED").toPromise().then((msg) => { this.chamarAlerta(msg) });
      return false;
    }

    if (this.meta.temPrazo && this.meta.prazo == "") {
      this.translate.get("DEADLINE_REQUIRED").toPromise().then((msg) => { this.chamarAlerta(msg) });
      return false;
    }

    return true;
  }


}

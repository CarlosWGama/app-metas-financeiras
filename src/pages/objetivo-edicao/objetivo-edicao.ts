import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { DataUtil } from '../../util/DataUtil';
import { Frequencia } from '../../models/Frequencia';
import { Meta } from '../../models/Meta';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { MetaProvider } from '../../providers/meta/meta';
import { Usuario } from '../../models/Usuario';

declare var firebase;
@IonicPage()
@Component({
  selector: 'page-objetivo-edicao',
  templateUrl: 'objetivo-edicao.html',
})
export class ObjetivoEdicaoPage {

  meta: Meta = new Meta();

  //traduções
  transAdicionarMembroInfo;
  transAdicionarMembro;
  transBtnAdicionar;
  transBtnCancelar;
  transBtnOk;
  transErro;
  transMetaSalva;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private toastCtrl: ToastController, private alertCtrl: AlertController,
    private usuarioProvider: UsuarioProvider, private loadingCtrl: LoadingController,
    private translate: TranslateService, private metaProvider:MetaProvider) {
  }

  ionViewDidLoad() {
    this.translate.get("ADD_MEMBER").toPromise().then((msg) => { this.transAdicionarMembro = msg });
    this.translate.get("ADD_MEMBER_INFO").toPromise().then((msg) => { this.transAdicionarMembroInfo = msg });
    this.translate.get("ERROR").toPromise().then((msg) => this.transErro = msg);
    this.translate.get("OK").toPromise().then((msg) => this.transBtnOk = msg);
    this.translate.get("ADD").toPromise().then((msg) => this.transBtnAdicionar = msg);
    this.translate.get("CANCEL").toPromise().then((msg) => this.transBtnCancelar = msg);
    this.translate.get("GOAL_SAVED").toPromise().then((msg) => { this.transMetaSalva = msg });


    this.meta.initialize(this.navParams.get("meta") as Meta);
    if (this.meta == null) this.meta = new Meta();
    this.usuarioProvider.getUsuarioByEmail(firebase.auth().currentUser.email).then((usuario: Usuario) => {
      this.meta.addMembro(usuario);
      console.log(this.meta);
    });
    
    console.log('ionViewDidLoad ObjetivoEdicaoPage');
  }

  /**
   * Adiciona um novo membro a meta
   */
  adicionarMembro() {
    this.alertCtrl.create({
      title:this.transAdicionarMembro,
      message: this.transAdicionarMembroInfo,
      inputs:[
        {name: "email", type:"email", placeholder: "E-mail"}
      ], 
      buttons: [
        {text: this.transBtnCancelar, role: "cancel"},
        {text: this.transBtnAdicionar, handler:(dados) => {
          if (dados.email == "") {
            this.translate.get("INVALID_EMAIL").toPromise().then((msg) => { this.chamarAlerta(msg) });
          } else {

            let load = this.loadingCtrl.create({enableBackdropDismiss: false});
            load.present();
            this.usuarioProvider.getUsuarioByEmail(dados.email).then((usuario) => {
              if (usuario != null) {
                this.meta.addMembro(usuario);
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
      title: this.transErro,
      message: mensagem,
      buttons: [this.transBtnOk]
    }).present();
  }

  /**
   * Define o valor recomendado para deposito de cada usuário
   */
  recomendado() {
    let resta = this.meta.objetivo - this.meta.acumulado;
    if (resta <= 0)
      this.meta.valorRecomendado = 0;
    else {
      console.log(this.meta.prazo);
      if (this.meta.temPrazo == true && (this.meta.prazo != undefined && this.meta.prazo != '')) {
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
        console.log(this.meta.valorRecomendado);
        this.meta.valorRecomendado = parseFloat(this.meta.valorRecomendado.toFixed(2));
        console.log(this.meta.valorRecomendado);
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
        message: this.transMetaSalva,
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

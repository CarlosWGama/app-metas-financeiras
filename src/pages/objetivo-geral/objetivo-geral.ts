import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Meta } from '../../models/Meta';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { Transacao } from '../../models/Transacao';
import { MetaProvider } from '../../providers/meta/meta';

declare var firebase;
/**
 * @author Carlos W. Gama
 */
@IonicPage()
@Component({
  selector: 'page-objetivo-geral',
  templateUrl: 'objetivo-geral.html',
})
export class ObjetivoGeralPage {

  meta: Meta = new Meta();

  usuario;

  //Conteudos de tradução
  transBtnCancelar;
  transBtnOk;
  transMsgRemoverTransacao;
  transValor;
  transBtnAdicionar;
  transAdicionarTransacao;
  transEditarTransacao;
  transDeposito;
  transSaque;
  transErro;
  transValorTransacao;
  transCategoriaInfo;
  transValorRecomendado;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private alertCtrl: AlertController, private events: Events, private translate: TranslateService,
    private metaProvider: MetaProvider) {
  }

  ionViewDidLoad() {    
    this.usuario = firebase.auth().currentUser.email;
    //Ajuste de Bug do Ionic
    this.events.subscribe("meta:inicia", (meta) => {
      this.meta.initialize(meta);
      console.log("Meta iniciada em Objetivo Geral");

    });
    console.log('ionViewDidLoad ObjetivoGeralPage');

    this.translate.get("ERROR").toPromise().then((msg) => this.transErro = msg);
    this.translate.get("CANCEL").toPromise().then((msg) => this.transBtnCancelar = msg);
    this.translate.get("OK").toPromise().then((msg) => this.transBtnOk = msg);
    this.translate.get("ADD").toPromise().then((msg) => this.transBtnAdicionar = msg);
    this.translate.get("DEPOSIT").toPromise().then((msg) => this.transDeposito = msg);
    this.translate.get("WITHDRAW").toPromise().then((msg) => this.transSaque = msg);
    this.translate.get("ADD_TRANSACTION").toPromise().then((msg) => this.transAdicionarTransacao = msg);
    this.translate.get("EDIT_TRANSACTION").toPromise().then((msg) => this.transEditarTransacao = msg);
    this.translate.get("AMOUNT_TRANSACTION").toPromise().then((msg) => this.transValorTransacao = msg);
    this.translate.get("CATEGORY_INFO").toPromise().then((msg) => this.transCategoriaInfo = msg);
    this.translate.get("REMOVE_TRANSACTION").toPromise().then((msg) => this.transMsgRemoverTransacao = msg);
    this.translate.get("NEXT_DEPOSIT_RECOMMENDATION").toPromise().then((msg) => this.transValorRecomendado = msg);
  }

  /**
   * Adiciona uma nova transação a meta atual
   */
  adicionarTransacao() {

    this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: this.transAdicionarTransacao,
      inputs: [
        {name: 'deposito', type:'radio', value:'true', checked: true, label:this.transDeposito},
        {name: 'deposito', type:'radio', value:'false', label: this.transSaque}
      ], 
      buttons:[
        {text: this.transBtnCancelar, role: 'cancel'},
        {text: this.transBtnAdicionar, handler: (data) => {

          console.log(data);
          let isDeposito:boolean = (data == 'true');

          this.alertCtrl.create({
              enableBackdropDismiss: false,
              title: this.transAdicionarTransacao,
              message: this.transValorRecomendado + ": " + this.meta.valorRecomendado,
              inputs: [
                {name: 'valor', type:'number',  placeholder: this.transValorTransacao, value: this.meta.valorRecomendado.toString()},
                {name: 'data', type:'date', value: new Date().toISOString().split('T')[0]},
                {name: 'categoria', type:'text', placeholder:this.transCategoriaInfo}
              ], 
              buttons:[
                {text: this.transBtnCancelar, role: 'cancel'},
                {text: this.transBtnAdicionar, handler: (data) => {

                  if (data.valor == "" ||data.valor == undefined ) {
                    this.translate.get("AMOUNT_REQUIRED").toPromise().then((msg) => { this.chamarAlerta(msg) });
                    return;
                  }
              
                  if (data.data == "" ||data.data == undefined ) {
                    this.translate.get("DATE_REQUIRED").toPromise().then((msg) => { this.chamarAlerta(msg) });
                    return;
                  }

                  //Cria meta
                  let uid = new Date().getUTCMilliseconds().toString();
                  let transacao = new Transacao(uid, firebase.auth().currentUser.email, isDeposito, Number(data.valor), data.data, data.categoria);
                  console.log(transacao);
                  this.meta.transacoes.push(transacao);
                  this.atualizaMeta();
                }}
              ] 
            }).present();


        }}
      ] 
    }).present();
  }

  private atualizaMeta() {
    this.meta.acumulado = 0;
    this.meta.transacoes.forEach((transacao) => {
      this.meta.acumulado += (transacao.deposito ? transacao.valor : -transacao.valor);
    });
    this.metaProvider.atualizar(this.meta);
    this.events.publish("meta:atualizar", this.meta);
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
   * Remove uma transação
   */
  remover(transacao: Transacao) {
    this.alertCtrl.create({
      message: this.transMsgRemoverTransacao,
      buttons: [
        {text:this.transBtnCancelar, role: "cancel"},
        {text:this.transBtnOk, handler:() => {
          this.meta = this.metaProvider.removerTransacao(this.meta, transacao);
        }}
      ]
    }).present();   
  }

  /**
   * Permite editar uma transação
   * @param transacao 
   */
  editar(transacao: Transacao) {

      this.alertCtrl.create({
          enableBackdropDismiss: false,
          title: this.transEditarTransacao,
          inputs: [
            {name: 'valor', type:'number',  placeholder: this.transValorTransacao, value: transacao.valor.toString()},
            {name: 'data', type:'date', value: transacao.data},
            {name: 'categoria', type:'text', placeholder:this.transCategoriaInfo, value: transacao.categoria}
          ], 
          buttons:[
            {text: this.transBtnCancelar, role: 'cancel'},
            {text: this.transBtnOk, handler: (data) => {

              if (data.valor == "" ||data.valor == undefined ) {
                this.translate.get("AMOUNT_REQUIRED").toPromise().then((msg) => { this.chamarAlerta(msg) });
                return;
              }
          
              if (data.data == "" ||data.data == undefined ) {
                this.translate.get("DATE_REQUIRED").toPromise().then((msg) => { this.chamarAlerta(msg) });
                return;
              }

              //Cria meta
              transacao.valor = Number(data.valor);
              transacao.data = data.data;
              transacao.categoria = data.categoria;
              console.log(transacao);
              let index = this.meta.transacoes.map((t) => t.id).indexOf(transacao.id);
              this.meta.transacoes[index] = (transacao);
              this.atualizaMeta();
            }}
          ] 
        }).present();
   }
}

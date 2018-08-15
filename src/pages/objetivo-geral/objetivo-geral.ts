import { Component, OnInit, OnChanges } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Meta } from '../../models/Meta';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { Transacao } from '../../models/Transacao';

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

  //Conteudos de tradução
  transBtnCancelar;
  transBtnOk;
  transMsgRemoverTransacao;
  transValor;
  transBtnAdicionar;
  transAdicionarTransacao;
  transDeposito;
  transSaque;
  transErro;
  transValorTransacao;
  transCategoriaInfo;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private alertCtrl: AlertController, private events: Events, private translate: TranslateService) {
  }

  ionViewDidLoad() {    
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
    this.translate.get("AMOUNT_TRANSACTION").toPromise().then((msg) => this.transValorTransacao = msg);
    this.translate.get("CATEGORY_INFO").toPromise().then((msg) => this.transCategoriaInfo = msg);
    this.translate.get("REMOVE_TRANSACTION").toPromise().then((msg) => this.transMsgRemoverTransacao = msg);
  
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

          let isDeposito = data;

          this.alertCtrl.create({
              enableBackdropDismiss: false,
              title: this.transAdicionarTransacao,
              inputs: [
                {name: 'valor', type:'number',  placeholder: this.transValorTransacao},
                {name: 'data', type:'date'},
                {name: 'data', type:'text', placeholder:this.transCategoriaInfo}
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
                    return false;
                  }
                }}
              ] 
            }).present();


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
   * Remove uma transação
   */
  remover(transacao: Transacao) {
    this.alertCtrl.create({
      message: this.transMsgRemoverTransacao,
      buttons: [
        {text:this.transBtnCancelar, role: "cancel"},
        {text:this.transBtnOk, handler:() => {
          
        }}
      ]
    }).present();   
  }
}
